import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Navigate } from "react-router-dom"
import './App.css';
import React from 'react';
import HomePage from './pages/User/HomePage/HomePage'
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {
  return (
    <>
    <Routes>
      <Route path = "/" element = {<HomePage/>}/>
      <Route path = "/login" element = {<Login/>}/>
      <Route path = "/register" element = {<Register/>}/>
    </Routes>
    </>
  );
}

export default App;
