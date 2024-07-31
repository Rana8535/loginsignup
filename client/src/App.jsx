import React from 'react';
import Signup from './Component/Signup';
import Login from './Component/Login';
import Home from './Component/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
    </>
  )
}

export default App