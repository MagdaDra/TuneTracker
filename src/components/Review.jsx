import {
    Button,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Avatar,
    Box,
    chakra,
    Container,
    Flex,
    Icon,
    SimpleGrid,
    useColorModeValue,
  } from '@chakra-ui/react'
import { useState, useEffect, useContext } from 'react';
import { SpotifyAuthContext } from '../context/Authentication.context';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Review() {
    const [albumReviews, setAlbumReviews] = useState([])
    const [review, setReview] = useState("");
    const [author, setAuthor] = useState("");
    const {albumId} = useParams();
    const value = useContext(SpotifyAuthContext)
    const accessToken = value.token;

    const handleReview = (event) => {
        setReview(event.target.value)
    }

    const handleAuthor = (event) => {
        setAuthor(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const newReview = {
                review, author, album_id: albumId
            }
            await axios.post('http://localhost:5005/reviews', newReview)
            setReview("")
            setAuthor("")
        } catch (error) {
            console.log('error adding new review', error)
        }
    }

    const getReviews = async () => {
        try {
            const response = await axios.get('http://localhost:5005/reviews')

            const albumReviews = response.data.filter(albumReview => albumReview.album_id === albumId)
            setAlbumReviews(albumReviews)
        } catch (error) {
            console.log('error fetching all reviews', error)
        }
    }

    useEffect(() => {
        getReviews()
    },[accessToken])

return (
<>
    <div className="allReviews">
        <Heading w="100%" textAlign={'center'} fontWeight="600" color="white" marginBottom={8} marginTop={8}>
                Reviews
        </Heading>
        <div>
        {albumReviews.map(reviewInfo => (
            <div key={reviewInfo.id}>
                <p> {reviewInfo.review} </p>
                <p> by {reviewInfo.author} </p>
            </div>
        ))}
        </div>









    </div>

    <div className="form">
    <div className="form-fields">
      <FormControl onSubmit = {handleSubmit}>
          <FormLabel htmlFor="album-cover" fontWeight={'600'} color="white">
          Review
          </FormLabel>
          <Input placeholder="Your review" type="text" value={review} onChange={handleReview} marginBottom="20px" paddingLeft={'5px'} height={'100px'} width={'40vw'}/>
      </FormControl>
        <div className="author-button">
      <FormControl onSubmit = {handleSubmit}>
          <FormLabel htmlFor="album-title" fontWeight={'600'} color="white">
          By
          </FormLabel>
          <Input placeholder="Your name" type="text" value={author} onChange={handleAuthor} marginBottom="20px" paddingLeft={'5px'} width={'20vw'}/>
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
        >Add Review
        </Button>
        </div>
        </div>
    </div>

  </div>
</>  
)
}

export default Review