import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Sidebarprop/Header";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
import Topbar from "../../pages/global/Topbar";
import Sidebar from "../../pages/global/Sidebar";
import { useState, useEffect } from "react";
import axios from 'axios';

const Form = () => {
  const [name,setName] = useState()
  const [role, setRole] = useState()
  const [email, setEmail] = useState()
  const [department, setDepartment] = useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(`http://localhost:3001/api/user/get-detail/${userId}`);
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
    const response = await axios.put(`http://localhost:3001/api/user/update-user/${userId}`,data);
    console.log(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit =  (values) => {

    console.log(values);

  };
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

            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                required
                id="outlined-required"
                
                value = {name}
                onChange={(e) => setName(e.target.value)}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                required
                id="outlined-required"
                
                value = {role}
                onChange= {(e) => setRole(e.target.value)}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                required
                id="outlined-required"
                
                value = {email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ gridColumn: "span 4" }}
              />
              
              <TextField
                required
                id="outlined-required"
               
                value = {department}
                onChange={e => setDepartment(e.target.value)}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button onClick = {handleSubmit} color="secondary" variant="contained">
                Update Information
              </Button>
            </Box>
          
    </Box>
    </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};




export default Form;
