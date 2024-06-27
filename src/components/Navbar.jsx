import { NavLink } from 'react-router-dom';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon} from '@chakra-ui/icons';
import { useContext} from 'react';
import { SpotifyAuthContext } from '../context/Authentication.context';
import music from '../assets/music.png'

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const value = useContext(SpotifyAuthContext);
  const user = value.user;

  console.log("User: ",user)

  

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
          <NavLink to='/main'>
            <Box maxW={5}>
                <img src={music} />
            </Box>
          </NavLink> 
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              <NavLink to="/main/myalbums">My Albums</NavLink>
              <NavLink to="/main/wishlist">WishList</NavLink>
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
          
            <Menu>
                <Text marginRight={2}> {user && user.display_name} </Text>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src= {user && user.images[1].url}
                />
              </MenuButton>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
            <NavLink to="/main/myalbums">My Albums</NavLink>
            <NavLink to="/main/wishlist">Wishlist</NavLink>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}