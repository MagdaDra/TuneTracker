import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArtistsMainScreen from './pages/ArtistsMainScreen';
import { Layout } from './components/Layout';
import WishList from './pages/WishList';
import AddAlbum from './pages/AddAlbum';
import EditAlbum from './pages/EditAlbum';
import SingleAlbum from './pages/SingleAlbum';

function App() {
  

  return (
    <ChakraProvider>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/main' element={<Layout> <ArtistsMainScreen /> </Layout>} />
        <Route path='/main/wishlist' element={<Layout> <WishList/> </Layout>} />
        <Route path='/main/wishlist/new' element={<Layout> <AddAlbum /> </Layout>} />
        <Route path='main/wishlist/edit/:albumId' element={<Layout> <EditAlbum /> </Layout>} />
        <Route path='/main/album/:albumId' element={<Layout> <SingleAlbum /> </Layout>} />
      </Routes> 
    </ChakraProvider>
  )
}

export default App;
