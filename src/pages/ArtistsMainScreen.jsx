import { useState, useEffect } from 'react';
import axios from "axios";


function ArtistsMainScreen() {

    const [artistsData, setArtistsData] = useState("")
    const [token, setToken] = useState("")
    const clientId = 'd41b6b28c6264b1fba6b949297186448';
    const clientSecret='4dfaa5781d554e9d94063dde6ef08bdb';

    const getToken = async () => {

        fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
        })

        .then(response => response.json())
        .then(data => {
            setToken(data.access_token);
        });
    };
    
    const authorization = {
        headers: {'Authorization': `Bearer ${token}`}
    }


    const artistsIds='https://api.spotify.com/v1/artists?ids=0L8ExT028jH3ddEcZwqJJ5%2C06HL4z0CvFAxyc27GXpf02'



    const getArtists = async () => {
        try {
            const response = await axios.get(artistsIds, authorization)
            setArtistsData(response.data);
        } catch (error) {
            console.log('error fetching artists from spotify:', error)
        }
    }

    console.log(artistsData)

    useEffect(() => {
        getToken();
        console.log('useEffect: mounting token');
        getArtists();
        console.log('useEffect: mounting artists');

    }, [])

     return (
         <div className="artists-list">
         
             {artistsData.artists.map(artist => {
                 return (
                     <div key={artist.id}>
                          <img src={artist.images[2].url} />
                          <h3>{artist.name}</h3>
                     </div>
                 )
            })}

         </div>
    );


    // const getArtists = async (token) => {
    //     const searchUrl = 'https://api.spotify.com/v1/search';

    //     try {
    //         const response = await axios.get(searchUrl, {
    //             authorization, 
    //             params: {
    //                 q: 'rock',
    //                 type: 'artist',
    //                 limit: 50
    //             }
    //         });
    //         setArtistsData(response.data)
    //     } catch (error) {
    //         console.log('error fetching artists from spotify:', error)
    //     }
    // }

}

export default ArtistsMainScreen;