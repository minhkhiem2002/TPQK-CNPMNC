import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import React from "react";
import HomePage from "./pages/Manager/HomePage/HomePage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { useState,useEffect } from "react";
import Topbar from "./pages/global/Topbar";
import Sidebar from "./pages/global/Sidebar";
import Dashboard from "./pages/dashboard";
import Team from "./pages/team";
import Invoices from "./pages/invoices";
import Contacts from "./pages/contacts";
import Bar from "./pages/bar";
import Form from "./pages/form";
import Line from "./pages/line";
import Pie from "./pages/pie";
import FAQ from "./pages/faq";
import Geography from "./pages/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./pages/calendar/calendar";
import An from "./components/An/An";
import ListRequest from "./pages/Manager/ListRequest/ListRequest";
import FRequest from './pages/Finance/FRequest/FRequest'
import './App.css'
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [role, setRole] = useState("");

  useEffect(() => {
    
    setRole(localStorage.getItem('role'));
  }, []);

  const renderDashboard = () => {
    if (role === "user") {
      return <Contacts />;
    } else if (role === "manager") {
      return <ListRequest />;
    } else if (role === "finance") {
      return <FRequest />;
    } else {
      // Handle other roles or show a default component
      return <Contacts />;
    }
  };
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register"  element={<Register />} />
        {/* <Route path="/" element={<Contacts />} /> */}
        <Route path="/" element={renderDashboard()} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/adminRequest" element={<ListRequest />} />
        <Route path="/financeRequest" element={<FRequest />} />
        <Route path="/form" element={<Form />} />
        <Route path="/bar" element={<Bar />} />
        <Route path="/pie" element={<Pie />} />
        <Route path="/line" element={<Line />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/geography" element={<Geography />} />
      </Routes>
    </>
  );
}

export default App;
