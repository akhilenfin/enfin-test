import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFoundPage from './pages/NotFoundPage';
import Dashboard from './pages/Dashboard';
import Movies from './pages/Movies';
import AddMovie from './pages/AddMovie';
import EditMovie from './pages/EditMovie';
import BulkUpload from './pages/BulkUpload';
// import CsvProcessor from './pages/CsvProcessor';
import Test from './pages/Test';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/editmovies/:id" element={<EditMovie />} />
        <Route path="/createmovie" element={<AddMovie />} />
        <Route path="/bulkupload" element={<BulkUpload />} />
        <Route path="/test" element={<Test />} />

        {/* <Route path="/bulkupload" element={<CsvProcessor />} />
        <Route path="/bulkupload1" element={<CsvProcessor />} /> */}
        <Route path="*" element={<NotFoundPage />} />createmovie
      </Routes>
    </div>
  );
}

export default App;
