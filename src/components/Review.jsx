import {
    Button,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Box,
    Center,
    Text,
    Stack,
    Textarea,
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
    const userInfo = value.user;

    console.log(userInfo)

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
            await axios.post('https://tune-tracker-backend.vercel.app/reviews', newReview);
            setReview("");
            setAuthor("");
            getReviews();
        } catch (error) {
            console.log('error adding new review', error)
        }
    }

    const getReviews = async () => {
        try {
            const response = await axios.get('https://tune-tracker-backend.vercel.app/reviews')

            const albumReviews = response.data.filter(albumReview => albumReview.album_id === albumId)
            setAlbumReviews(albumReviews)
        } catch (error) {
            console.log('error fetching all reviews', error)
        }
    }

    const deleteReview = async (id) => {
        try {
           await axios.delete(`https://tune-tracker-backend.vercel.app/reviews/${id}?_embed=tasks`);
           getReviews();
        } catch (error) {
            console.log('Error deleting my album', error)
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
            
            <Center py={12} key={reviewInfo.id}>
            <Box className='review-box'
                role={'group'}
                maxW={'500px'}
                w={'full'}
                bg="gray.50" _dark={{ bg: "gray.800" }}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                >
                <Stack  align={'center'} paddingTop={3} paddingBottom={2}>
                <Heading fontSize={20} fontFamily={'body'} fontWeight={500}>
                {reviewInfo.review}
                </Heading>
                <Text color={'gray.500'} fontSize={'sm'}>
                by {reviewInfo.author}
                </Text>
            
                </Stack>
            </Box>
                <Button
                    colorScheme={'purple'}
                    marginBottom={'20px'}
                    backgroundImage={'linear-gradient(to bottom right, rgb(248 155 41), rgb(231 38 123))'}
                    rounded={'full'}
                    px={6}
                    marginRight={'2vw'}
                    _hover={{
                    bg: 'rgb(247,255,0)',
                    color: 'rgb(231 38 123)',
                    }}
                    onClick={() => deleteReview(reviewInfo.id)}
                    marginLeft={7}>
                    Delete
                </Button>
            </Center>
            
        ))}
        </div>





    </div>

    <div className="form">
    <div className="form-fields">
    <div>
      <FormControl onSubmit = {handleSubmit}>
          <FormLabel htmlFor="album-cover" fontWeight={'600'} color="white">
          Review
          </FormLabel>
          <Textarea className='review-field' placeholder="Your review" value={review} onChange={handleReview} marginBottom="20px" paddingLeft={'5px'} paddingTop={'5px'} width={'60vw'} maxWidth={'800px'}/>
      </FormControl>
      </div>
        <div className="author-button">
            <div>
                <FormControl onSubmit = {handleSubmit}>
                    <FormLabel htmlFor="album-title" fontWeight={'600'} color="white">
                    By
                    </FormLabel>
                    <Input placeholder="Your name" type="text" value={author} onChange={handleAuthor} paddingLeft={'5px'}/>
                </FormControl>
            </div>
            <div className="add-album-button">
                <Button 
                type="submit"
                color={'white'}
                backgroundImage={'linear-gradient(to bottom right, rgb(248 155 41), rgb(231 38 123))'}
                rounded={'full'}
                marginLeft={'7'}
                px={6}
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