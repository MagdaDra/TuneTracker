import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SpotifyAuthContext = createContext();

// Create a wrapper
const SpotifyAuthProviderWrapper = props => {
  const [token, setToken] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const clientId = 'd41b6b28c6264b1fba6b949297186448';
  const navigate = useNavigate();

  const authenticateUser = async () => {
    const isAuthenticating = localStorage.getItem('authenticating');

    if (!isAuthenticating) {
      localStorage.setItem('authenticating', true);
      const storedAccessToken = localStorage.getItem('access_token');

      if (storedAccessToken) {
        console.log('refreshing the token');
        getRefreshToken();
      } else {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (!code) {
          console.log('authenticating');

          redirectToAuthCodeFlow(clientId);
        } else {
          console.log('getting the token');

          await getAccessToken(clientId, code);
        }
        navigate('/main');
      }
      localStorage.removeItem('authenticating');
    }
  };

  async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem('verifier', verifier);

    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('response_type', 'code');
    params.append('redirect_uri', 'http://localhost:5173');
    params.append('scope', 'user-read-private user-read-email');
    params.append('code_challenge_method', 'S256');
    params.append('code_challenge', challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  function generateCodeVerifier(length) {
    let text = '';
    let possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  async function getAccessToken(clientId, code) {
    try {
      const verifier = localStorage.getItem('verifier');

      const params = new URLSearchParams();
      params.append('client_id', clientId);
      params.append('grant_type', 'authorization_code');
      params.append('code', code);
      params.append('redirect_uri', 'http://localhost:5173');
      params.append('code_verifier', verifier);

      const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params
      });
      const response = await result.json();
      console.log(response);
      if (response.access_token) {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);

        setToken(response.access_token);

        const userResult = await fetch('https://api.spotify.com/v1/me', {
          method: 'GET',
          headers: {Authorization: `Bearer ${response.access_token}`}
        })

        const userResponse = await userResult.json()

        setUser(userResponse)
      }
    } catch (error) {
      console.log('error getting the access token', error);
    }
  }

  const getRefreshToken = async () => {
    // refresh token that has been previously stored
    const refreshToken = localStorage.getItem('refresh_token');
    const url = 'https://accounts.spotify.com/api/token';

    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: clientId
      })
    };
    const body = await fetch(url, payload);
    const response = await body.json();
    console.log('this response', response);

    if (response.access_token) {
      setToken(response.access_token);

      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);

      const userResult = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {Authorization: `Bearer ${response.access_token}`}
      })

      const userResponse = await userResult.json()

      setUser(userResponse)
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <SpotifyAuthContext.Provider value={{ token, user, authenticateUser }}>
      {props.children}
    </SpotifyAuthContext.Provider>
  );
};

export { SpotifyAuthContext, SpotifyAuthProviderWrapper };