import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
    Button,
    Heading,
    FormControl,
    FormLabel,
    Input,
  } from '@chakra-ui/react'


const EditWishAlbum = () => {
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [img, setImg] = useState("");
    const navigate = useNavigate();
    const {albumId} = useParams();

    const handleTitle = (event) => {
        setTitle(event.target.value)
    }

    const handleArtist = (event) => {
        setArtist(event.target.value)
    }

    const handleImg = (event) => {
        setImg(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
          const album = {
            title, artist, img
          } 
          await axios.put(`http://localhost:5005/wishlist/${albumId}?_embed=tasks`, album);
          navigate(`/main/wishlist`)

        } catch (error) {
           console.log('Error updating the album', error) 
        }
    }    

    const getSingleAlbum = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5005/wishlist/${id}?_embed=tasks`);
            setImg(response.data.img);
            setTitle(response.data.title);
            setArtist(response.data.artist);

        } catch (error) {
            console.log('Error fetching the single album', error)
        }
    };

    useEffect(() => {
        getSingleAlbum(albumId);
    }, [albumId]);

    return (
        <>
          <Heading w="100%" textAlign={'center'} fontWeight="600" mb="2%" color="white" marginTop="30px" marginBottom="20px">
            Edit Album
          </Heading>
          
            <FormControl onSubmit = {handleSubmit}>
                <FormLabel htmlFor="album-cover" fontWeight={'600'} color="white">
                Album cover
                </FormLabel>
                <Input id="album-cover" placeholder="Add cover" type="text" name="img" value={img} onChange={handleImg} marginBottom="20px" paddingLeft={'5px'}/>
            </FormControl>

            <FormControl onSubmit = {handleSubmit}>
                <FormLabel htmlFor="album-title" fontWeight={'600'} color="white">
                Album title
                </FormLabel>
                <Input id="album-title" placeholder="Add title" type="text" name="title" value={title} onChange={handleTitle} marginBottom="20px" paddingLeft={'5px'}/>
            </FormControl>
          
          <FormControl onSubmit = {handleSubmit}>
            <FormLabel htmlFor="email" fontWeight={'600'} color="white">
              Artist
            </FormLabel>
            <Input id="email" placeholder="Add artist" type="text" name="artist" value={artist} onChange={handleArtist} marginBottom="20px" paddingLeft={'5px'} />
          </FormControl>
    
        <div className="add-album-button">
          <Button 
            type="submit"
            color={'white'}
            backgroundImage={'linear-gradient(to bottom right, rgb(248 155 41), rgb(231 38 123))'}
            rounded={'full'}
            px={8}
            _hover={{
                bg: 'rgb(247,255,0)',
                color: 'rgb(231 38 123)'
            }}
            onClick={handleSubmit}
            >Edit Album</Button>
            </div>
        </>
      )

}

export default EditWishAlbum;