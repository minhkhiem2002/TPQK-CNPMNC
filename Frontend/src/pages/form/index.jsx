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
  const initialValues = {
    name: name,
    role: role,
    email: email,
    department: department,
  };
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
  console.log(initialValues)
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

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={(e) => setName(e.target.value)}
                name= {name}
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Role"
                onBlur={handleBlur}
                onChange= {(e) => setRole(e.target.value)}
                name="role"
                error={!!touched.role && !!errors.role}
                helperText={touched.role && errors.role}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Department"
                onBlur={handleBlur}
                onChange={e => setDepartment(e.target.value)}
                name="department"
                error={!!touched.department && !!errors.department}
                helperText={touched.department && errors.department}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update Information
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
    </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>

  );
};


const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  role: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  department: yup.string().required("required"),
});


export default Form;
