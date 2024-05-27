import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFoundPage from './pages/NotFoundPage';
import Dashboard from './pages/Dashboard';
import Movies from './pages/Movies';
import AddMovie from './pages/AddMovie';
import EditMovie from './pages/EditMovie';

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
        
        <Route path="*" element={<NotFoundPage />} />createmovie
      </Routes>
    </div>
  );
}

export default App;
