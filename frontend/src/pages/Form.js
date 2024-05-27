// Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
//import Menu from './Menu';
import axios from '../config/axiosConfig';


const Form = ({ heading ,buttonName }) => {
    const { id } = useParams();
    const [title, setTitle] = useState([]);
    const [description, setDescription] = useState([]);
    const [date, setDate] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState([]);
    const navigate = useNavigate();

    const handleSelectChange = (event) => {
        setSelectedGenre(event.target.value);
    };

    useEffect(() => {
        const fetchMovieDetails = async () => {
          if (id !== undefined) {
            try {
              const response = await axios.post('editmovies/'+id);
              const movie = response.data.results;
              setTitle(movie.title);
              setDescription(movie.description);
              setDate(formatDate(movie.release_date));
              setSelectedGenre(movie.genre);
            } catch (error) {
              console.error('Error fetching movie details:', error);
            }
          }
        };

        function formatDate(dateString) {
            const date = new Date(dateString);
            
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
            const day = date.getDate().toString().padStart(2, '0');
            
            return `${year}-${month}-${day}`;
        }
        fetchMovieDetails();
    }, [id]);
    

    const handleButton = async (e) =>{
        e.preventDefault();

        try {
            if (id === undefined) {
                if( title == "" || description == "" || date == "" || selectedGenre == "" ){
                    alert("Please enter all fields");
                    return false;
                }
                const response = await axios.post('createmovie', { title : title, description : description, release_date : date, genre : selectedGenre });
                if (response.status === 200) {
                    navigate('/movies');
                }
                else{
                    alert("Something went wrong. Please try again later!");
                }
            }
            else{
                const response = await axios.post('updatemovies/'+id, { title : title, description : description, release_date : date, genre : selectedGenre });
                if (response.status === 200) {
                    navigate('/movies');
                }
                else{
                    alert("Something went wrong. Please try again later!");
                }
            }
        } catch (error) {
            alert("Something went wrong. Please try again later!" + error.message);
        }
    }

  return (
    <>
    <div className="card-header">
    <strong className="card-title">{ heading }</strong>
    </div>

    <div className="card-body">
        <div className="row">
            <div className="col-md-6">
                <div className="form-group mb-3">
                    <label htmlFor="title">Movie Title</label>
                    <input 
                        type="text" 
                        id="title" 
                        className="form-control" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="release_date">Release Date</label>
                    <input 
                        type="date" 
                        id="release_date" 
                        className="form-control" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="genre">Genre</label>
                    <select className="form-control" id="genre" value={selectedGenre} onChange={handleSelectChange}>
                        <option value="">-- Select Genre --</option>
                        <option value="Action">Action</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Drama">Drama</option>
                        <option value="Romantic">Romantic</option>
                    </select>
                </div>
            </div>
            <div className='col-md-6'>
                <div class="form-group mb-3">
                    <label for="example-textarea">Description</label>
                    <textarea 
                        class="form-control" 
                        id="example-textarea" 
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                
                <div className="form-group mb-3" >
                    <button type="submit" id="btnName" className="btn btn-primary" onClick={handleButton}>
                        {buttonName}
                    </button>
                </div>
            </div>
            
        </div>
    </div>
    </>
  );
};

export default Form;
