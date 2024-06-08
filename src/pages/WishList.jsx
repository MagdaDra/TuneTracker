import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function WishList () {

    const [albums, setAlbums] = useState([]);

    const getAlbums = async () => {
        try {
            const response = await axios.get('http://localhost:5005/albums');
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
    
    return (
        <div>
            <h2 className="wishlist">My WishList 💫</h2>
            <Link to="/main/wishlist/new">
                <button>Add new album</button>
            </Link>
            
            <ul className="wish-list">
            {albums.map(album => {
                return (
                    <li key={album.id} className="list-item">
                        <img src={album.img} className="wishImg"/>
                        <h2>{album.title}</h2>
                        <p>by {album.artist}</p>
                    </li>
                )
            })}
            </ul>
        </div>
    )

}