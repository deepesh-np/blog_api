import React from 'react'
import {Routes,Route} from "react-router-dom";
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx' 
import Publish from './Pages/Publish.jsx';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/publish" element={<Publish />} />
      </Routes>
    </div>
  )
}

export default App
