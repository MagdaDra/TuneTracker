import { useParams } from "react-router-dom";
import { useState, useContext, useEffect} from 'react';
import { SpotifyAuthContext } from "../context/Authentication.context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Image,
    Button
  } from '@chakra-ui/react'




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
          title: albumInfo.name, artist: albumInfo.artists[0].name, img: albumInfo.images[1].url} 
          await axios.post('http://localhost:5005/wishlist', newRecord)
         navigate('/main/wishlist')
     } catch (error) {
         console.log('Error adding the album to wishlist', error)
     }
    }
    const addToMyAlbums = async () => {
      try {
      const newRecord = {
          title: albumInfo.name, artist: albumInfo.artists[0].name, img: albumInfo.images[1].url} 
          await axios.post('http://localhost:5005/albums', newRecord)
         navigate('/main/myalbums')
     } catch (error) {
         console.log('Error adding the album to my albums', error)
     }
    }




        useEffect(() => {
            getAlbum();
        }, [])


        return (
            <div className="single-album">
            {
                albumInfo && (
<>

                <Center py={12} bg={'white'} className="single-album-box">
                    <Box
                        className="single-album-box"
                        role={'group'}
                        p={6}
                        maxW={'800px'}
                        w={'full'}
                        boxShadow={'xl'}
                        rounded={'lg'}
                        pos={'relative'}
                        zIndex={0}>
                        <div>
                            <Box
                                rounded={'lg'}
                                mt={-12}
                                pos={'relative'}
                                height={'230px'}
                                _after={{
                                    transition: 'all .3s ease',
                                    content: '""',
                                    w: '230px',
                                    h: 'full',
                                    pos: 'absolute',
                                    top: 5,
                                    left: 0,
                                    backgroundImage: `url(${albumInfo.images[1].url})`,
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
                                    src={albumInfo.images[1].url}
                                />
                            </Box>

                            <Stack pt={10} height={'120px'} align={'center'}>
                                <Heading fontSize={'xl'} fontFamily={'body'} fontWeight={800}>
                                    {albumInfo.name}
                                </Heading>
                                <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                                    by {albumInfo.artists[0].name}
                                </Text>
                            </Stack>
                        </div>  
                        <div> 
                        <Stack marginTop={'20px'} marginBottom={'60px'}> 
                            <Text fontWeight={500} fontSize={'1xl'}>
                            Number of tracks: {albumInfo.total_tracks}
                            </Text>
                            <Text fontWeight={500} fontSize={'1xl'}>
                            Release date: {albumInfo.release_date}
                            </Text>
                            <Text fontWeight={500} fontSize={'1xl'}>
                            Popularity (0-100): {albumInfo.popularity}
                            </Text>
                        </Stack>    

                            <div className="album-buttons">
                            <Button 
                            colorScheme={'purple'}
                            marginBottom={'20px'}
                            backgroundImage={'linear-gradient(to bottom right, rgb(248 155 41), rgb(231 38 123))'}
                            rounded={'full'}
                            px={6}
                            _hover={{
                                bg: 'purple.500',
                            }}
                            onClick={addToMyAlbums}
                            >+ My Albums</Button>
                            <br />
                            <Button 
                            type="submit"
                            colorScheme={'purple'}
                            backgroundImage={'linear-gradient(to bottom right, rgb(248 155 41), rgb(231 38 123))'}
                            rounded={'full'}
                            px={8}
                            _hover={{
                                bg: 'purple.500',
                            }}
                            onClick={addToWishlist}
                            >+ WishList</Button>
                            </div>
                        </div>     
                    </Box>
                    </Center>
                
                
</>
                )
            }
            </div>
        )

}


export default SingleAlbum;