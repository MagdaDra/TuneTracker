import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from "react-router-dom";
import { SpotifyAuthProviderWrapper } from './context/Authentication.context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <SpotifyAuthProviderWrapper>
        <App />
      </SpotifyAuthProviderWrapper>
    </Router>
  </React.StrictMode>,
);
