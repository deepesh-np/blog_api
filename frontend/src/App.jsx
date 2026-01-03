import React from 'react'
import {Router,Routes} from "react-router-dom";
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx' 
import Publish from './Pages/Publish.jsx';

const App = () => {
  return (
    <div>
      <Router>
        <Routes path="/" element={<Home />} />
        <Routes path="/login" element={<Login />} />
        <Routes path="/register" element={<Register />} />
        <Routes path="/publish" element={<Publish />} />
      </Router>
    </div>
  )
}

export default App
