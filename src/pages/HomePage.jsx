
import { NavLink } from 'react-router-dom';

import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
} from '@chakra-ui/react';

export default function HomePage() {
  return (
    <>


      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Track your <br />
            <Text as={'span'} color={'pink.400'}>
              favourite albums
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia aperiam consectetur saepe facilis, aliquam libero minima! Excepturi earum omnis, voluptates cumque cupiditate doloribus, nisi fugiat dicta ullam quod, laborum totam.

          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            <NavLink to='/main'>
                <Button
                onClick={'/main'}
                colorScheme={'green'}
                bg={'purple.400'}
                rounded={'full'}
                px={6}
                _hover={{
                    bg: 'purple.500',
                }}>
                Get Started
                </Button>
            </NavLink>
            {/* <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
              Learn more
            </Button> */}
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
