import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArtistsMainScreen from './pages/ArtistsMainScreen';
import { Layout } from './components/Layout';
import WishList from './pages/WishList';
import AddWishAlbum from './pages/AddWishAlbum';
import EditWishAlbum from './pages/EditWishAlbum';
import SingleAlbum from './pages/SingleAlbum';
import MyAlbums from './pages/MyAlbums';
import EditMyAlbum from './pages/EditMyAlbum';
import AddMyAlbum from './pages/AddMyAlbum';
import NewReleases from './components/NewReleases';
import Review from './components/Review';
import { useState } from 'react';


function App() {
  const [isSearching, setIsSearching] = useState(false)

  const handleWhatever = () => {
    console.log('hi!')
  }
  

  return (
    <ChakraProvider>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/main' element={<Layout> <ArtistsMainScreen handleSearching={setIsSearching} hi={handleWhatever} /> {!isSearching && <NewReleases />}  </Layout>} />
        <Route path='/main/wishlist' element={<Layout> <WishList/> </Layout>} />
        <Route path='/main/wishlist/new' element={<Layout> <AddWishAlbum /> </Layout>} />
        <Route path='main/wishlist/edit/:albumId' element={<Layout> <EditWishAlbum /> </Layout>} />
        <Route path='/main/album/:albumId' element={<Layout> <SingleAlbum /> <Review /> </Layout>} />
        <Route path='/main/myalbums' element={<Layout> <MyAlbums/> </Layout>} />
        <Route path='main/myalbums/edit/:albumId' element={<Layout> <EditMyAlbum /> </Layout>} />
        <Route path='/main/myalbums/new' element={<Layout> <AddMyAlbum /> </Layout>} />
      </Routes> 
    </ChakraProvider>
  )
}

export default App;
