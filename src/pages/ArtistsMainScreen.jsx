import { useState, useEffect} from 'react';
import axios from "axios";


function ArtistsMainScreen() {

    const [albumsData, setAlbumsData] = useState("")
    const [search, setSearch] = useState("")

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
        const authParameters = {
            // 14:30 min filmiku
        }
    }, [])

    // change the search to be searched after we press enter or 'search' button
    // accessToken = useContext(token)

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



}

export default ArtistsMainScreen;