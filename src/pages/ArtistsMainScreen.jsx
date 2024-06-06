import { useState, useEffect } from 'react';
import axios from "axios";


function ArtistsMainScreen() {

    const [artist, setArtist] = useState("")
    const [token, setToken] = useState("")
    const clientId = 'd41b6b28c6264b1fba6b949297186448';
    const clientSecret='4dfaa5781d554e9d94063dde6ef08bdb';

    const getToken = async () => {

        fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
        })

        .then(response => response.json())
        .then(data => {
            setToken(data.access_token);
        });

    };

    const artistsIds='https://api.spotify.com/v1/artists?ids=2CIMQHirSU0MQqyYHq0eOx%2C57dN52uHvrHOxijzpIgu3E%2C1vCWHaC5f2uS3yhpwWbIA6'

    // const getArtist = async () => {
    //     fetch(`https://api.spotify.com/v1/artists/${artistAPI}`, {
    // method: 'GET',
    // headers: {'Authorization': 'Bearer BQDh4yGDLmTAi1vtHSeTfPQCKSBzOuHecT5Y3TuhQg8lIcyYrOHy4M3V28V08MGNtibO9b-JYsagjTMGJRtcAD8azg6_sEmmE5biyxpJ9c3zEjDM7QA'}
    // })
    // .then(response => response.json())
    // .then(artistData => {
    //     setArtist(artistData);
    // });
    // }

    const authorization = {
        headers: {'Authorization': `Bearer ${token}`}
    }

    const getArtist = async () => {
        try {
            const response = await axios.get('https://api.spotify.com/v1/artists?ids=0L8ExT028jH3ddEcZwqJJ5%3Fsi%3DNHI4JsHFTCGqY8Wjt-hFBg%2C06HL4z0CvFAxyc27GXpf02%3Fsi%3DS7Qx_7aNQYWGLHGfayIYow', authorization)
            setArtist(response.data);
        } catch (error) {
            console.log('error fetching artist from spotify:', error)
        }
    }

    console.log(artist)

    useEffect(() => {
        getToken();
        console.log('useEffect: mounting token');
        getArtist();
        console.log('useEffect: mounting artist');

    }, [])

    return (
        <div>

        </div>
    )
}

export default ArtistsMainScreen;