// Dashboard.js
import React from 'react';
// import { useNavigate } from 'react-router-dom';
import Menu from './Menu';
import MoviesList from './MovieList';
//import axios from '../config/axiosConfig';


const Movies = () => {
  
  return (
  <div className="wrapper">
  <Menu />   
  <main 
  role="main" 
  className="main-content"
  style={{ width: "80%", float: "left" }}
   >
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12" style={{ background:"#fff", height: "1000px", paddingTop:"15px" }}>
          <MoviesList />
        </div>
      </div>
    </div>
  </main>
 </div>

  );
};

export default Movies;
