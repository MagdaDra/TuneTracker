import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";


const EditAlbum = () => {
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [img, setImg] = useState("");
    const navigate = useNavigate();
    const {albumId} = useParams();

    const handleTitle = (event) => {
        setTitle(event.target.value)
    }

    const handleArtist = (event) => {
        setArtist(event.target.value)
    }

    const handleImg = (event) => {
        setImg(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
          const album = {
            title, artist, img
          } 
          await axios.put(`http://localhost:5005/albums/${albumId}?_embed=tasks`, album);
          navigate(`/main/wishlist`)

        } catch (error) {
           console.log('Error updating the album', error) 
        }
    }    

    const getSingleAlbum = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5005/albums/${id}?_embed=tasks`);
            setImg(response.data.img);
            setTitle(response.data.title);
            setArtist(response.data.artist);

        } catch (error) {
            console.log('Error fetching the single album', error)
        }
    };

    useEffect(() => {
        getSingleAlbum(albumId);
    }, [albumId]);

    return (
        <div>
            <h2>Edit Album</h2>
            <form onSubmit={handleSubmit}>
            <label>Album&apos;s cover</label>
            <input type="text" name="img" value={img} onChange={handleImg} />
            <label>Album&apos;s title</label>
            <input type="text" name="title" value={title} onChange={handleTitle} />
            <label>Artist</label>
            <input type="text" name="artist" value={artist} onChange={handleArtist} />
            <button type="submit">Edit Album</button>
            </form>
        </div>
    )

}

export default EditAlbum;