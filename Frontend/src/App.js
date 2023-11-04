import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Navigate } from "react-router-dom"
import './App.css';
import React from 'react';
import HomePage from './pages/User/HomePage/HomePage'

function App() {
  return (
    <>
    <Routes>
        <Route path = "/" element = {<HomePage/>}/>
    </Routes>
    </>
  );
}

export default App;
