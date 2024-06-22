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
  } from '@chakra-ui/react';
import axios from 'axios';  

  const NewReleases = () => {

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

    {/* <div key={album.id}>
        <img src={album.images[2].url} />
        <h1>{album.artists[0].name}</h1>
        <h2>{album.name}</h2>
    </div> */}

    return (
        
        <div className="new-results">
            <div className="release-heading">  <h1>New Releases</h1> </div>
            <div className="search-result">
            {albums.map(album => {
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
                                src={album.images[2].url}
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

  export default NewReleases;