import { useState, useContext} from 'react';
import { SpotifyAuthContext } from '../context/Authentication.context';
import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
  } from '@chakra-ui/react'


function ArtistsMainScreen() {

    const [albumsData, setAlbumsData] = useState([])
    const [search, setSearch] = useState("")

    const value = useContext(SpotifyAuthContext)
    const accessToken = value.token
    console.log("Access token:", accessToken)


    // Search
    
    // Display the albums to the user
    
    const handleSearch = async () => {
        //console.log("Search for " + search)
        
        // Get request using search to get the Artist ID
        const artistParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        }

        const artistId = await fetch('https://api.spotify.com/v1/search?q=' + search + '&type=artist' , artistParameters)
            .then(response => response.json())
            .then(data => {return data.artists.items[0].id})

            console.log('Artist ID is ' + artistId)

    // Get request with Artist ID to receive all the albums from the artist

    const albums = await fetch('https://api.spotify.com/v1/artists/' + artistId + '/albums' + '?include_groups=album&limit=50', artistParameters)
        .then(response => response.json())
        .then(data => {
            setAlbumsData(data.items)
        })
    }

    console.log(albumsData)


    return (
        <>
            <div className="search-bar">
                <form onSubmit={e => e.preventDefault()}>
                    <input 
                        type="text" 
                        placeholder="Search artist" 
                        onKeyUp={event => {
                            if(event.key === 'Enter') {
                                handleSearch()}
                        }}
                        onChange = {event => setSearch(event.target.value)}
                    />
                </form>
                <button onClick={handleSearch}> Search </button>
            </div>

            <div className="search-result">
                 {albumsData.map(album => {
                    return ( 

                        


                        <div key={album.id} className="search-tile">
                            <Image 
                                src={album.images[1].url}
                                rounded={'lg'}
                                height={230}
                                width={230}
                                objectFit={'cover'} 
                            />
                            <h3>{album.name}</h3>
                         </div>
                    )
                })}
            </div>
        </>
    )

}

export default ArtistsMainScreen;