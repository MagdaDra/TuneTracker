import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Heading,
    FormControl,
    FormLabel,
    Input,
  } from '@chakra-ui/react'

function AddMyAlbum() {
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [img, setImg] = useState("");
    const navigate = useNavigate();

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
               title, artist, img
               } 
               await axios.post('http://localhost:5005/albums', newRecord)
               navigate('/main/myalbums')
        } catch (error) {
            console.log('Error creating the album', error)
        }
    }

    // return (
    //     <div>
    //         <form onSubmit = {handleSubmit}>
    //             <label>Album&apos;s cover</label>
    //             <input type="text" name="img" value={img} onChange={handleImg} />
    //             <label>Album&apos;s title</label>
    //             <input type="text" name="title" value={title} onChange={handleTitle} />
    //             <label>Artist</label>
    //             <input type="text" name="artist" value={artist} onChange={handleArtist} />
    //             <button type="submit">Add Album</button>
    //         </form>
    //     </div>
    // )

    return (
        <>
          <Heading w="100%" textAlign={'center'} fontWeight="600" mb="2%" color="white" marginTop="30px" marginBottom="20px">
            Add Album
          </Heading>
          
            <FormControl mr="5%" onSubmit = {handleSubmit}>
                <FormLabel htmlFor="album-cover" fontWeight={'600'} color="white">
                Album cover
                </FormLabel>
                <Input id="album-cover" placeholder="Add cover" type="text" name="img" value={img} onChange={handleImg} marginBottom="20px"/>
            </FormControl>

            <FormControl onSubmit = {handleSubmit}>
                <FormLabel htmlFor="album-title" fontWeight={'600'} color="white">
                Album title
                </FormLabel>
                <Input id="album-title" placeholder="Add title" type="text" name="title" value={title} onChange={handleTitle} marginBottom="20px"/>
            </FormControl>
          
          <FormControl mt="2%" onSubmit = {handleSubmit}>
            <FormLabel htmlFor="email" fontWeight={'600'} color="white">
              Artist
            </FormLabel>
            <Input id="email" placeholder="Add artist" type="text" name="artist" value={artist} onChange={handleArtist} />
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
            >Add Album</Button>
            </div>
        </>
      )

}

export default AddMyAlbum;