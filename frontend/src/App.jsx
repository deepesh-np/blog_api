/** @format */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx';
import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import Profile from './Pages/Profile.jsx';
import Publish from './Pages/Publish.jsx';
import Article from './Pages/Article.jsx';
import NotFound from './Pages/NotFound.jsx';

import ProtectedRoute from './Components/ProtectedRoute.jsx';

const App = () => {
  return (
    <div className='bg-bg text-text min-h-screen transition-colors duration-200'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/article/:slug' element={<Article />} />

        <Route
          path='/publish'
          element={
            <ProtectedRoute>
              <Publish />
            </ProtectedRoute>
          }
        />

        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
