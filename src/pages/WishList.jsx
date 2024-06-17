import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from '@chakra-ui/react';
import { Link } from "react-router-dom";

export default function WishList () {

    const [albums, setAlbums] = useState([]);
    

    const getAlbums = async () => {
        try {
            const response = await axios.get('http://localhost:5005/wishlist');
            setAlbums(response.data);
        console.log(albums);
        } catch (error) {
            console.log('error fetching wishlist', error)
        }
    }


    useEffect(() => {
        console.log('useEffect: Mounting wishlist')
        getAlbums();
    }, []);

    const deleteProject = async (id) => {
        try {
           await axios.delete(`http://localhost:5005/albums/${id}?_embed=tasks`);
           getAlbums();
        } catch (error) {
            console.log('Error deleting the project', error)
        }
    }
    
    return (
        <div>
            <h2 className="wishlist">My WishList 💫</h2>
            
            <Link to='/main/wishlist/new'>
                <Button 
                colorScheme={'green'}
                bg={'purple.400'}
                rounded={'full'}
                px={6}
                _hover={{
                    bg: 'purple.500',
                }}>Add new album</Button>
            </Link>
            
            
            <ul className="wish-list">
            {albums.map(album => {
                return (
                    <li key={album.id} className="list-item">
                        <img src={album.img} className="wishImg"/>
                        <h2>{album.title}</h2>
                        <p>by {album.artist}</p>
                        <Link to={`/main/wishlist/edit/${album.id}`}>
                            <button>Edit</button>
                        </Link> <br />
                        <button onClick={() => deleteProject(album.id)}>Delete</button>
                    </li>
                )
            })}
            </ul>
        </div>
    )

}