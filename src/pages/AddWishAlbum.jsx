import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddWishAlbum() {
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [img, setImg] = useState("");
    const navigate = useNavigate();

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
           const newRecord = {
               title, artist, img
               } 
               await axios.post('http://localhost:5005/wishlist', newRecord)
               navigate('/main/wishlist')
        } catch (error) {
            console.log('Error creating the album', error)
        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit}>
                <label>Album&apos;s cover</label>
                <input type="text" name="img" value={img} onChange={handleImg} />
                <label>Album&apos;s title</label>
                <input type="text" name="title" value={title} onChange={handleTitle} />
                <label>Artist</label>
                <input type="text" name="artist" value={artist} onChange={handleArtist} />
                <button type="submit">Add Album</button>
            </form>
        </div>
    )

}

export default AddWishAlbum;