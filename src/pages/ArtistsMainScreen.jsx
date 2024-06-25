import { useState, useContext, useEffect} from 'react';
import { SpotifyAuthContext } from '../context/Authentication.context';
import { NavLink } from 'react-router-dom';
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Image,
    Button,
    
  } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'


function ArtistsMainScreen({handleSearching, hi}) {

    const [albumsData, setAlbumsData] = useState([])
    const [search, setSearch] = useState("")

    const value = useContext(SpotifyAuthContext)
    const accessToken = value.token
    console.log("Access token:", accessToken)


    // Search
    
    // Display the albums to the user
    
    const handleSearch = async () => {

        handleSearching(true)
        hi()

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
        console.log(albums)
    }

    useEffect(() => {
        return () => {
            handleSearching(false)
        }
    },[])

    


    return (
        <div>
            <div className="search-bar">
                <form onSubmit={e => e.preventDefault()}>
                    
                    <input 
                        
                        className="search-input"
                        type="text" 
                        placeholder="Search artist" 
                        onKeyUp={event => {
                            if(event.key === 'Enter') {
                                handleSearch()}
                        }}
                        onChange = {event => setSearch(event.target.value)}
                    />
                
                </form>
                <Button 
                    className="search-button" 
                    onClick={handleSearch}
                    px={4}
                    marginLeft={'8px'}
                    marginTop={'6px'}
                    
                    bg={'white.400'}
                    color={'white'}
                        
                    _hover={{
                    bg: 'grey.500',
                    }}
                    _focus={{
                    bg: 'blue.500',
                    }}
                > <Search2Icon/> </Button>
            </div>

            <div className="search-result">
                 {albumsData.map(album => {
                    return ( 

                        <NavLink key={album.id} to={`/main/album/${album.id}`}>
                        <Center py={12} className="center-box">
                        <Box
                            role={'group'}
                            p={6}
                            maxW={'290px'}
                            w={'full'}
                            boxShadow={'2xl'}
                            rounded={'lg'}
                            pos={'relative'}
                            zIndex={0}>
                            <Box
                            rounded={'lg'}
                            mt={-12}
                            pos={'relative'}
                            height={'230px'}
                            _after={{
                                transition: 'all .3s ease',
                                content: '""',
                                w: 'full',
                                h: 'full',
                                pos: 'absolute',
                                top: 5,
                                left: 0,
                                backgroundImage: `url(${album.images[1].url})`,
                                filter: 'blur(15px)',
                                zIndex: -1,
                            }}
                            _groupHover={{
                                _after: {
                                filter: 'blur(20px)',
                                },
                            }}>
                            <Image
                                rounded={'lg'}
                                height={230}
                                width={230}
                                objectFit={'cover'}
                                src={album.images[1].url}
                            />
                            </Box>
                            <Stack pt={10} align={'center'} height={'130px'}>
                            <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                                {album.artists[0].name}
                            </Text>
                            <Heading fontSize={'1xl'} fontFamily={'body'} fontWeight={500}>
                                {album.name}
                            </Heading>
                            </Stack>
                        </Box>
                        </Center>
                        </NavLink>
                    )
                })}
            </div>
        </div>
    )

}

export default ArtistsMainScreen;
