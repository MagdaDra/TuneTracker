import { useState, useContext, useEffect} from 'react';
import { SpotifyAuthContext } from "../context/Authentication.context";
import axios from "axios";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Image,
    Button,
  } from '@chakra-ui/react'
import { FaStar } from "react-icons/fa";


function SingleAlbum() {
    const {albumId} = useParams();
    const value = useContext(SpotifyAuthContext)
    const accessToken = value.token;
    const userInfo = value.user;
    const [albumInfo, setAlbumInfo] = useState(null)
    const [button, setButton] = useState("+ My Albums")
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)
    const navigate = useNavigate()

    // get request with Album ID to receive album details

    
    //console.log('Album ID is: ', albumId)
    
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
          title: albumInfo.name, artist: albumInfo.artists[0].name, img: albumInfo.images[1].url, spotify_id: albumId, user: userInfo.display_name} 
          await axios.post('http://localhost:5005/wishlist', newRecord)
         navigate('/main/wishlist')
     } catch (error) {
         console.log('Error adding the album to wishlist', error)
     }
    }
    const addToMyAlbums = async () => {
      try {
      const newRecord = {
          title: albumInfo.name, artist: albumInfo.artists[0].name, img: albumInfo.images[1].url, spotify_id: albumId, user: userInfo.display_name} 
          await axios.post('http://localhost:5005/albums', newRecord)
         navigate('/main/myalbums')
     } catch (error) {
         console.log('Error adding the album to my albums', error)
     }
    }

    const getRating = async() => {
        try {
            const response = await axios.get(`http://localhost:5005/ratings`)

            const myRating = response.data.find(albumRating => albumRating.spotify_id === albumId)
            setRating(myRating)
        } catch (error) {
            console.log("Error fetching rating value", error)
            setRating(null)
        }
    }

    

    const addRating = async (ratingValue) => {
        try {
            if(rating) {
                const updatedRating = {
                    ratingValue,
                    user: userInfo.display_name, spotify_id: albumId
                }
                await axios.put(`http://localhost:5005/ratings/${rating.id}`, updatedRating)
    
            } else {
    
                const newRating = {
                    ratingValue,  user: userInfo.display_name, spotify_id: albumId}
                    await axios.post('http://localhost:5005/ratings', newRating)
            }

            getRating()
        } catch (error) {
            console.log('Error adding the rating', error)
        }
    }

    





    useEffect(() => {
        getAlbum();
        getRating();
    }, [accessToken])

    console.log("Rating is: ",rating)

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

                        <Stack pt={10} height={'600px'} align={'left'}>
                            <Heading fontSize={'xl'} fontFamily={'body'} fontWeight={800} maxW={350}>
                                {albumInfo.name}
                            </Heading>
                            <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'} marginBottom={2}>
                                by {albumInfo.artists[0].name}
                            </Text>
                        <NavLink to={albumInfo.external_urls.spotify}> 
                            <Image
                                src='/src/assets/spotify.png'
                                className = 'spotify-icon'
                                />
                        </NavLink>    
                        <div className="track-list"> 
                        Tracks: <br/>
                        <ol className="singleAlbum-list">
                        {albumInfo.tracks.items.map(track => {
                            return (
                                <li className="singleAlbum-item" key={track.id}> {track.name} </li>
                            )
                        })}
                        </ol>
                        </div>
                        </Stack>
                    </div>  
                    <div> 
                    <Stack marginTop={'20px'} marginBottom={'50px'}> 
                        <Text fontWeight={500} fontSize={'1xl'}>
                        Number of tracks: <span className="text-styling"> {albumInfo.total_tracks} </span>
                        </Text>
                        <Text fontWeight={500} fontSize={'1xl'}>
                        Release date: <span className="text-styling"> {albumInfo.release_date} </span>
                        </Text>
                        <Text fontWeight={500} fontSize={'1xl'}>
                        Popularity (0-100): <span className="text-styling"> {albumInfo.popularity} </span>
                        </Text>
                        
                        <div className="star-rating">
                        <Text fontWeight={500} fontSize={'1xl'} marginRight={3}>
                        Your rate: 
                        </Text>
                            {[...Array(5)].map((star, index )=> {
                                const currentRating = index + 1;
                                return (
                                    <div key={index}>
                                    <label>
                                        <input 
                                        type="radio" 
                                        name="rating"
                                        value={currentRating} 
                                        onClick={() => {
                                            addRating(currentRating)
                                            }}

                        //                 onClick ={ () => {
                        //                 addToMyAlbums()
                        //                 setButton("✔️ My Albums")
                            
                        //                  }}
                                        />
                                        <FaStar 
                                            className="star" 
                                            size={20} 
                                            color={currentRating <= (hover || rating && rating.ratingValue) ? "#ffc107" : "#e4e5e9"}
                                            onMouseEnter={() => setHover(currentRating)}
                                            onMouseLeave={() => setHover(null)}
                                            />   
                                    </label>
                                    </div>
                                );
                            })}   
                        </div>
                    </Stack>    

                        <div className="album-buttons">
                        <Button 
                        colorScheme={'purple'}
                        backgroundImage={'linear-gradient(to bottom right, rgb(248 155 41), rgb(231 38 123))'}
                        rounded={'full'}
                        px={8}
                        _hover={{
                            bg: 'rgb(247,255,0)',
                            color: 'rgb(231 38 123)'
                        }}
                        onClick ={ () => {
                            
                            addToMyAlbums()
                            setButton("✔️ My Albums")
                            
                        }}
                        > {button} </Button>
                        <Button 
                        type="submit"
                        colorScheme={'purple'}
                        backgroundImage={'linear-gradient(to bottom right, rgb(248 155 41), rgb(231 38 123))'}
                        rounded={'full'}
                        px={8}
                        _hover={{
                            bg: 'rgb(247,255,0)',
                            color: 'rgb(231 38 123)'
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