import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArtistsMainScreen from './pages/ArtistsMainScreen';
import { Layout } from './components/Layout';
import GetToken from './components/GetToken';

function App() {
  

  return (
    <ChakraProvider>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/main' element={
          <Layout> 
              <GetToken token={{token}}>
                <ArtistsMainScreen /> 
              </GetToken>
          </Layout>} />
      </Routes> 
    </ChakraProvider>
  )
}

export default App
