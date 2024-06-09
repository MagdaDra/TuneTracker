import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArtistsMainScreen from './pages/ArtistsMainScreen';
import { Layout } from './components/Layout';
import WishList from './pages/WishList';
import AddAlbum from './pages/AddAlbum';
import EditAlbum from './pages/EditAlbum';

//import { SpotifyAuthProviderWrapper } from './context/Authentication.context';

function App() {
  

  return (
    <ChakraProvider>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/main' element={<Layout> <ArtistsMainScreen /> </Layout>} />
        <Route path='/main/wishlist' element={<WishList/>} />
        <Route path='/main/wishlist/new' element={<AddAlbum />} />
        <Route path='main/wishlist/edit/:albumId' element={<EditAlbum />} />
      </Routes> 
    </ChakraProvider>
  )
}

export default App;
