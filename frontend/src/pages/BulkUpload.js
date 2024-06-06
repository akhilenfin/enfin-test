// Dashboard.js
import React from 'react';
// import { useNavigate } from 'react-router-dom';
import Menu from './Menu';
import CsvProcessor from './CsvProcessor';
//import axios from '../config/axiosConfig';


const BulkUpload = () => {

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
          <CsvProcessor fields={['title', 'description', 'release_date', 'genre']} url="/upload_files" redirection="/abc"/>
        </div>
      </div>
    </div>
  </main>
 </div>

  );
};

export default BulkUpload;
