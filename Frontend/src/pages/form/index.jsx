import { Box, Button, TextField } from "@mui/material";
import Header from "../../components/Sidebarprop/Header";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
import Topbar from "../../pages/global/Topbar";
import Sidebar from "../../pages/global/Sidebar";
import { useState, useEffect } from "react";
import axios from 'axios';
import { backendURL } from "../../requests/endpoint";
import './index.css'
const Form = () => {
  const [name,setName] = useState()
  const [role, setRole] = useState()
  const [email, setEmail] = useState()
  const [department, setDepartment] = useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(backendURL + `/api/user/get-detail/${userId}`);
        setName(response.data.data.name)
        setRole(response.data.data.role)
        setEmail(response.data.data.email)
        setDepartment(response.data.data.department)
     
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
    const userId = localStorage.getItem("userId");
    const data = {
      name,
      role,
      email,
      department
    }
    const response = await axios.put(backendURL + `/api/user/update-user/${userId}`,data);
    console.log(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  const [color, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={color}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
    <Box m="20px">

      <Header title="Profile" subtitle="View your Persional Information" />
    <div className="form-inf">

 
    <Box
      display="grid"
      gap="20px"
      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
    >
      <div><strong>Name:</strong></div>
      <TextField
        required
        id="outlined-required"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ gridColumn: "span 4" }}
      />

      <div><strong>Role:</strong></div>
      <TextField
        required
        id="outlined-required"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        sx={{ gridColumn: "span 4" }}
      />

      <div><strong>Email:</strong></div>
      <TextField
        required
        id="outlined-required"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ gridColumn: "span 4" }}
      />

      <div><strong>Department:</strong></div>
      <TextField
        required
        id="outlined-required"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        sx={{ gridColumn: "span 4" }}
      />
    </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button onClick = {handleSubmit} color="secondary" variant="contained">
                Update Information
              </Button>
            </Box>
            </div>
          
    </Box>
    
    </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};




export default Form;
