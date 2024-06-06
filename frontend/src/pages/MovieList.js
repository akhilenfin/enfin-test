// Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../config/axiosConfig';
import Pagination from './Pagination';
import Upload from './Upload';


const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(3);
    const [totalPages, setTotalPages] = useState(0);

    const navigate = useNavigate();


    useEffect(() => {
       
  
      fetchMovies();
    }, [page]);

    const fetchMovies = async () => {
      try {
          const response = await axios.post('listmovies',{ search : search, limit : limit, page : page});
          if (response.status === 200) {
              setMovies(response.data.results);
              setTotalPages(Math.ceil(response.data.total.length / limit));
          }
      } catch (error) {
        alert('Error fetching movies:', error);
      }
    };

    const handleAdd = () =>{
        navigate('/createmovie');
    }

    const handlePageChange = (page) => {
      setPage(page);
    };

    
    const handleDelete = async (e) => {
      e.preventDefault();
      
      if (window.confirm('Are you sure you want to delete this movie?')) {
        let id = e.target.href.split('/').pop();
        try {
            const response = await axios.post('deletemovies/'+id);
            if (response.status === 200) {
              setPage(1);
              fetchMovies();
            }
        } catch (error) {
          alert('Error deleting movies:', error);
        }
      }
    };

    const handleSearch = (event) => {
      // Access the value entered in the input field using event.target.value
      const value = event.target.value;
      setSearch(value);
      fetchMovies();
    };

    const handleBulkDelete = async(event) => {
        const checkboxes = document.querySelectorAll('.mycheckbox');
        let isChecked = [];

        for(let i=0;i<checkboxes.length;i++) {
          if(checkboxes[i].checked){
            isChecked.push(checkboxes[i].id);
          }
        }
        try{
          if (isChecked.length>0){
            if (window.confirm('Are you sure you want to delete?')) {
              const response = await axios.post('deletebulk',{ ids : JSON.stringify(isChecked) });
              if (response.status === 200) {
                  setPage(1);
                  fetchMovies();
                  document.getElementById("all").checked = false;
                  const checkboxes1 = document.querySelectorAll('.mycheckbox');
                  checkboxes1.forEach(function(checkbox1) {
                      checkbox1.checked = true;
                  });
                  alert(response.data.message);
              }
            }
          }
        } catch (error) {
          alert('Error in Bulk Delete:', error.message);
        }
      
    };

    const handleAll = ( e ) => {
      const checkboxes1 = document.querySelectorAll('.mycheckbox');
      if (document.getElementById("all").checked) {
        checkboxes1.forEach(function(checkbox1) {
            checkbox1.checked = true;
        });
      } else {
        checkboxes1.forEach(function(checkbox1) {
            checkbox1.checked = false;
        });
      }
      
      
    };


  return (
    <div className="card shadow">
  <div className="card-body">
    <div className="toolbar row mb-3">
      <div className="col">
        <form className="form-inline">
          <div className="form-row">
            <div className="form-group col-auto">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <input
                type="text"
                className="form-control"
                id="search"
                defaultValue=""
                placeholder="Search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyUp={handleSearch}
              />
            </div>
            
          </div>
        </form>
      </div>
      <div className="col ml-auto">
        <div className="dropdown float-right">
          <button className="btn btn-primary float-right ml-3" type="button" onClick={handleAdd}>
            Add more +
          </button>
          <Link className="btn btn-primary float-right ml-3" to={`/bulkupload`}>
            Upload CSV
          </Link>
          <button className="btn btn-primary float-right ml-3" type="button" onClick={handleBulkDelete}>
            Bulk Delete
          </button>
          
        </div>
      </div>
    </div>
    {/* table */}
    <table className="table table-bordered" id="mytable">
      <thead>
        
        <tr role="row">
          <th>
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="all"
                onClick={handleAll}
              />
              <label className="custom-control-label" htmlFor="all" />
            </div>
          </th>
          <th>Title</th>
          <th>Release Date</th>
          <th>Genre</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => (
           <tr>
                <td>
                    <div className="custom-control custom-checkbox">
                    <input
                        type="checkbox"
                        className="custom-control-input mycheckbox"
                        id={movie.id}
                    />
                    <label className="custom-control-label" htmlFor={movie.id} />
                    </div>
                </td>
                <td>{movie.title}</td>
                <td>{movie.release_date}</td>
                <td>{movie.genre}</td>
                <td>{movie.description}</td>
                <td>
                    <Link to={`/editmovies/${movie.id}`}>Edit</Link>
                    &nbsp;&nbsp;
                    <Link to={`/deletemovies/${movie.id}`} onClick={handleDelete}>Delete</Link>
                    
                </td>
           </tr>
        ))}
      </tbody>
    </table>
    <nav aria-label="Table Paging" className="mb-0 text-muted">
    <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
    />
     
    </nav>
  </div>

  


</div>

  );
};



export default MovieList;
