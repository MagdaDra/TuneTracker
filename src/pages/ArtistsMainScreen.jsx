import { useState, useEffect} from 'react';
import axios from "axios";


function ArtistsMainScreen() {

    const [albumsData, setAlbumsData] = useState("")
    //const [search, setSearch] = useState("")

    const getAllAlbums = async () => {
        try {
            const response = await axios.get('https://www.theaudiodb.com/api/v1/json/2/searchalbum.php?s=red_hot_chili_peppers');
            setAlbumsData(response.data)
        } catch (error) {
            console.log('error fetching albums', error)
        }
    };

    console.log(albumsData)

    useEffect(() => {
        getAllAlbums();
    }, [])

    // const handleSearch = async(event) => {
    //     const query = event.target.value;
    //     setSearch(query);
    //     try {
    //         const responseSearch = await axios.get(`https://theaudiodb.com/api/v1/json/523532/searchalbum.php?s=${query}`);
    //         setAlbumsData(responseSearch.data)
    //     } catch (error) {
    //         console.log("Error fetching search value", error)
    //     }

    // }

    return (
        <>
            {/* <div>
                <form>
                    <label>Search</label>
                    <input type="text" placeholder="Search" value={search} onChange={handleSearch} />
                </form>
            </div> */}

            {/* <div>
                {albumsData.album.map(albumInfo => {
                    return (
                        <div key={albumInfo.idAlbum}>
                            <img src={albumInfo.strAlbumThumb} alt="" />
                            <h3>{albumInfo.strAlbum}</h3>
                        </div>
                    )
                })}
            </div> */}
        </>
    )



    // --------------------------------------- SEARCH FORM -------------------------------------------------------------------------

    
//   const getRefreshToken = async () => {

//    // refresh token that has been previously stored
//    const refreshToken = localStorage.getItem('refresh_token');
//    const url = "https://accounts.spotify.com/api/token";

//     const payload = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       },
//       body: new URLSearchParams({
//         grant_type: 'refresh_token',
//         refresh_token: refreshToken,
//         client_id: clientId
//       }),
//     }
//     const body = await fetch(url, payload);
//     const response await body.json();

//     localStorage.setItem('access_token', response.accessToken);
//     localStorage.setItem('refresh_token', response.refreshToken);
//   }

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