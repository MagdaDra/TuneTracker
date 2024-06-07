import { useState, useEffect } from 'react';
import axios from "axios";


function ArtistsMainScreen({token}) {

    const [artistsData, setArtistsData] = useState("")


    // --------------------------------------- SEARCH FORM -------------------------------------------------------------------------

    


    const authorization = {
    headers: {'Authorization': `Bearer ${token}`}}

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

    // -------------------------------------------------------------------------------------------------------------------------


    // const searchUrl = 'https://api.spotify.com/v1/search';


    // const getArtists = async () => {
        

    //     try {
    //         const response = await axios.get(searchUrl, 
    //             authorization, {
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

    // console.log(artistsData)

    // useEffect(() => {
    // getToken();
    // console.log('useEffect: mounting token');
    // getArtists();
    // console.log('useEffect: mounting artists');

    // }, [])

}

export default ArtistsMainScreen;