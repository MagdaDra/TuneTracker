import { useState, useContext } from "react";
import { SpotifyAuthContext } from "../context/Authentication.context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Heading,
    FormControl,
    FormLabel,
    Input,
  } from '@chakra-ui/react'

function AddWishAlbum() {
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [img, setImg] = useState("");
    const navigate = useNavigate();
    const value = useContext(SpotifyAuthContext)
    const userInfo = value.user;

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
           const newRecord = {
               title, artist, img,  user: userInfo.display_name
               } 
               await axios.post('http://localhost:5005/wishlist', newRecord)
               navigate('/main/wishlist')
        } catch (error) {
            console.log('Error creating the album', error)
        }
    }


    return (
        <div className="form">
          <Heading w="100%" textAlign={'center'} fontWeight="600" mb="2%" color="white" marginTop="30px" marginBottom="20px">
            Add to WishList
          </Heading>
          
          <div className="form-fields">
            <FormControl onSubmit = {handleSubmit}>
                <FormLabel htmlFor="album-cover" fontWeight={'600'} color="white">
                Album cover
                </FormLabel>
                <Input id="album-cover" placeholder="Add cover" type="text" name="img" value={img} onChange={handleImg} paddingLeft={'5px'} marginBottom="20px"/>
            </FormControl>

            <FormControl onSubmit = {handleSubmit}>
                <FormLabel htmlFor="album-title" fontWeight={'600'} color="white">
                Album title
                </FormLabel>
                <Input id="album-title" placeholder="Add title" type="text" name="title" value={title} onChange={handleTitle} paddingLeft={'5px'} marginBottom="20px"/>
            </FormControl>
          
            <FormControl onSubmit = {handleSubmit}>
              <FormLabel htmlFor="email" fontWeight={'600'} color="white">
                Artist
              </FormLabel>
              <Input id="email" placeholder="Add artist" type="text" name="artist" value={artist} onChange={handleArtist} paddingLeft={'5px'} marginBottom="20px"/>
            </FormControl>
          </div>
    
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
              >Add Album</Button>
            </div>
        </div>
      )

}

export default AddWishAlbum;