import { useState, useEffect } from 'react';

function GetToken () {

    const [token, setToken] = useState("")
    // const [refreshToken, setRefreshToken] = useState("")
    const clientId = 'd41b6b28c6264b1fba6b949297186448';
    const clientSecret ='4dfaa5781d554e9d94063dde6ef08bdb';

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
    }

    useEffect(() => {
        getToken();
        console.log('useEffect: mounting token');
     // getRefreshToken();
     // console.log('useEffect: mounting refresh token')
    }, [])

    return (
        
    )


    // refresh token from spotify ???? ---------------------------------------------------------------------

    // const getRefreshToken = async () => {

    //     // refresh token that has been previously stored
    //     const url = "https://accounts.spotify.com/api/token";
     
    //      const payload = {
    //        method: 'POST',
    //        headers: {
    //          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    //        },
    //        body: new URLSearchParams({
    //          grant_type: 'refresh_token',
    //          refresh_token: refreshToken,
    //          client_id: clientId
    //        }),
    //      }
    //     fetch(url, payload)

    //     .then(response => response.json())
    //     .then(data => {
    //         setToken(data.accessToken)
    //         setRefreshToken(data.refreshToken)
    //     });

    //    }

}

export default GetToken;