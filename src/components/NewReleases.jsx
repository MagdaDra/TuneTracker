import { useState, useContext, useEffect} from 'react';
import { SpotifyAuthContext } from '../context/Authentication.context';
// import { NavLink } from 'react-router-dom';
// import {
//     Box,
//     Center,
//     Heading,
//     Text,
//     Stack,
//     Image,
    
    
//   } from '@chakra-ui/react';

import axios from 'axios';  

  function NewReleases() {

    const [albums, setAlbums] = useState([])
    const value = useContext(SpotifyAuthContext)
    const accessToken = value.token
    console.log("Access token:", accessToken)

    const getNewAlbums = async () => {

        const authorization = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }

        try {
            const response = await axios.get('https://api.spotify.com/v1/browse/new-releases?limit=50', authorization)
            setAlbums(response.data.albums.items)
            console.log(response)
            
        } catch (error) {
            console.log("Error fetching new releases", error)
        }
    }

    //const albumsArray = albums.albums.items

    console.log("Albums: ",albums)

    useEffect(() => {
        getNewAlbums();
    }, [accessToken])

    return (
        <div className="new-releases">
            {albums.map(album => {
              return (
                <div key={album.id}>
                    <img src={album.images[2].url} />
                    <h1>{album.artists[0].name}</h1>
                    <h2>{album.name}</h2>
                </div>
              )  
            })}
        </div>
    )
    



  }

  export default NewReleases;