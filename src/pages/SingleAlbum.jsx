import { useParams } from "react-router-dom";
import { useState, useContext, useEffect} from 'react';
import { SpotifyAuthContext } from "../context/Authentication.context";
import axios from "axios";
import { Button } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";




function SingleAlbum() {
    const {albumId} = useParams();
    const value = useContext(SpotifyAuthContext)
    const accessToken = value.token;
    const [albumInfo, setAlbumInfo] = useState(null)
    const navigate = useNavigate()

    // get request with Album ID to receive album details

    
    console.log('Album ID is: ', albumId)
    
    const getAlbum = async () => { 
        
        const authorization = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        }

        try {
            const response = await axios.get(`https://api.spotify.com/v1/albums/${albumId}`, authorization)
            setAlbumInfo(response.data)
            console.log("response: ",response)
        } catch (error) {
            console.log("Error fetching single album info", error)
        }

        };

    const addToWishlist = async () => {
    
    
      try {
      const newRecord = {
          name: albumInfo.name, artist: albumInfo.artists[0].name, image: albumInfo.images[1].url} 
          await axios.post('http://localhost:5005/wishlist', newRecord)
         navigate('/main/wishlist')
     } catch (error) {
         console.log('Error adding the album to wishlist', error)
     }
              

    }

        useEffect(() => {
            getAlbum();
        }, [])


        return (
            <div>
            {
                albumInfo && (
<>
                <div>
                <img src={albumInfo.images[1].url} />
                <h2>{albumInfo.name}</h2>
                <p>Number of tracks: {albumInfo.total_tracks}</p>
                <p>Release date: {albumInfo.release_date}</p>
                <p>Popularity (0-100): {albumInfo.popularity}</p>
                </div>

                <div className="album-buttons">
                </div>
                
                    <Button 
                    colorScheme={'purple'}
                    bg={'purple.400'}
                    rounded={'full'}
                    px={6}
                    _hover={{
                        bg: 'purple.500',
                    }}>+ My Albums</Button>
                

                    <Button 
                    type="submit"
                    colorScheme={'purple'}
                    bg={'purple.400'}
                    rounded={'full'}
                    px={6}
                    _hover={{
                        bg: 'purple.500',
                    }}

                    onClick={addToWishlist}
                    
                    >+ WishList</Button>
                
</>
                )
            }
            </div>
        )

}


export default SingleAlbum;