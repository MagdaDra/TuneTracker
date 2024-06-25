import { useState, useEffect, useContext } from "react";
import { SpotifyAuthContext } from "../context/Authentication.context";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";

import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Image,
    Button,
    
  } from '@chakra-ui/react'

export default function MyAlbums () {

    const [albums, setAlbums] = useState([]);
    const value = useContext(SpotifyAuthContext)
    const userInfo = value.user;
    

    const getAlbums = async () => {
        try {
            const response = await axios.get('http://localhost:5005/albums');
            setAlbums(response.data);
        console.log('My albums:',albums);
        } catch (error) {
            console.log('error fetching my albums', error)
        }
    }


    useEffect(() => {
        console.log('useEffect: Mounting my albums')
        getAlbums();
    }, []);

    const deleteProject = async (id) => {
        try {
           await axios.delete(`http://localhost:5005/albums/${id}?_embed=tasks`);
           getAlbums();
        } catch (error) {
            console.log('Error deleting my album', error)
        }
    }
    
    return (
        <div className="margin-bottom">
            <div className="header-myalbums">
            <h3 className="myAlbums">My Albums </h3>
            
            <Link to='/main/myalbums/new'>
                <Button 
                colorScheme={'purple'}
                backgroundImage={'linear-gradient(to bottom right, rgb(248 155 41), rgb(231 38 123))'}
                rounded={'full'}
                px={8}
                marginTop={'10'}
                marginLeft={'10'}
                _hover={{
                    bg: 'rgb(247,255,0)',
                    color: 'rgb(231 38 123)'
                }}>Add album</Button>
            </Link>
            </div>
            
            
            <div className="wish-list">
                {albums
                    .filter(album => userInfo && album.user === userInfo.display_name)
                    .map(album => (
                    <div key={album.id}>
                        
                        <Center py={12} className="center-box" marginTop={'10'}>
                        <Box
                            role={'group'}
                            p={6}
                            maxW={'290px'}
                            w={'full'}
                            boxShadow={'2xl'}
                            rounded={'lg'}
                            pos={'relative'}
                            zIndex={0}>
                            <NavLink to={`/main/album/${album.spotify_id}`}>
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
                                backgroundImage: `url(${album.img})`,
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
                                src={album.img}
                                />
                            </Box>
                            <Stack pt={10} align={'center'} height={'130px'}>
                                <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                                {album.artist}
                                </Text>
                                <Heading fontSize={'1xl'} fontFamily={'body'} fontWeight={500}>
                                {album.title}
                                </Heading>
                            </Stack>
                            </NavLink>
                            <div className="myAlbums-buttons">
                            <NavLink to={`/main/myalbums/edit/${album.id}`}>
                                <Button
                                colorScheme={'purple'}
                                marginBottom={'20px'}
                                backgroundImage={'linear-gradient(to bottom right, rgb(248 155 41), rgb(231 38 123))'}
                                rounded={'full'}
                                px={8}
                                _hover={{
                                    bg: 'rgb(247,255,0)',
                                    color: 'rgb(231 38 123)',
                                }}>
                                Edit
                                </Button>
                            </NavLink>
                            <Button
                                colorScheme={'purple'}
                                marginBottom={'20px'}
                                backgroundImage={'linear-gradient(to bottom right, rgb(248 155 41), rgb(231 38 123))'}
                                rounded={'full'}
                                px={6}
                                _hover={{
                                bg: 'rgb(247,255,0)',
                                color: 'rgb(231 38 123)',
                                }}
                                onClick={() => deleteProject(album.id)}>
                                Delete
                            </Button>
                            </div>
                        </Box>
                        </Center>
                    </div>
                    ))}
            </div>
        </div>
    )

}