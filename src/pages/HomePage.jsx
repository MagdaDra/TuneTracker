import { NavLink } from 'react-router-dom';
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  
} from '@chakra-ui/react';
import music from "../assets/music.png";

export default function HomePage() {
  
  return (
    <Container  maxW={'3xl'} className="homePage">
        <Stack
        height={'100vh'}
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
            color={'white'}
            marginBottom={6}
            >
            <div className="home-title">
            <img src={music} className="music-icon" />
            TuneTracker
            </div>
            <br />
  
            <Text as={'span'} color={'rgb(247,255,0)'}>
            Track your favourite albums
            </Text>
          </Heading>
          {/* <Text color={'gray.500'}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia aperiam consectetur saepe facilis, aliquam libero minima! Excepturi earum omnis, voluptates cumque cupiditate doloribus, nisi fugiat dicta ullam quod, laborum totam.

          </Text> */}
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
              <NavLink to="/main">
                <Button
                colorScheme={'pink'}
                bg={'rgb(247,255,0)'}
                rounded={'full'}
                px={6}
                _hover={{
                    bg: 'rgb(222,230,0)',
                }}
                color={'grey'}>
                Get Started
                </Button>
              </NavLink>  
          </Stack>
        </Stack>
      </Container>
    
  );
}
