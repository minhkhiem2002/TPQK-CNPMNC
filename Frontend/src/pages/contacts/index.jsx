import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Sidebarprop/Header";
import { useTheme } from "@mui/material";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
import Topbar from "../../pages/global/Topbar";
import Sidebar from "../../pages/global/Sidebar";
import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from 'axios'
import './index.css'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { backendURL } from "../../requests/endpoint";
import Container from "react-bootstrap/esm/Container";
import {
  Button,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions
} from "@material-ui/core";
import Box1 from "../../Box/Box1";
function ModalBox(props) {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    dname: "",
    dsource: ""
  });
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedExpense, setSelectedExpense] = useState(null);
  const handleChange = name => e => {
    setState({
      ...state,
      [name]: e.target.value
    });
  };
  const handlePostRequest = async (e) => {
    props.addDataSource(state.dname, state.dsource);
    setOpen(false);
    e.preventDefault()
    const userId = localStorage.getItem('userId')
    const apiUrl = backendURL+'/api/request/';
    const datapost = {
      createdBy: userId,
      description: state.dname,
      requestAmount: state.dsource
    }     
    try {
        const response = await axios.post(apiUrl, datapost);
        const token = response.data;
   
        
          await axios.get(backendURL + `/api/request/${userId}`);
        
      } catch (error) {
        console.error('Login failed:', error);
      }
}

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="create-button">
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Create New
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        id="request-form"
      >
        <DialogTitle
      id="form-dialog-title"
      sx={{ fontWeight: 'bold', textAlign: 'center' }}
    >
      Create Request
    </DialogTitle>
        <DialogContent className="content">
          <DialogContentText>
            To send a request please fill in the form
          </DialogContentText>
        
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Description"
            type="text"
            value={state.dname || ""}
            onChange={handleChange("dname")}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price"
            type="text"
            value={state.dsource || ""}
            onChange={handleChange("dsource")}
            fullWidth
          />
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={
              handlePostRequest
           }
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [color, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedExpense, setSelectedExpense] = useState(null);
  const columns = ["Id", "Description", "Expense", "Status"];
  const [data, setData] = useState([]);
  const [opendetail,setOpendetail]=useState(false)
  let id = 0;
  function createData(name, provider, status) {
    id += 1;
    return [id, name, provider, status];
  }

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId')
        const response = await axios.get(`http://localhost:3001/api/request/${userId}`);
        const userName = await axios.get(`http://localhost:3001/api/user/get-detail/${userId}`);
     
       
        const newData = response.data.data.map((item, index) => [
          index + 1,
          item.description,
          item.requestAmount,
          item.status,
        ]);
        console.log("neww",response.data.data)
  
     
  
        // Cập nhật state với mảng mới
        setData(response.data.data);
  
        console.log("Data", data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  // const options = {
   
  //   filterType: "checkbox"
  // };
  
  const options = {
    customHeadRender: (columnMeta, handleToggleColumn) => {
      return (
        <th key={columnMeta.index} onClick={() => handleToggleColumn(columnMeta.index)}>
          <span style={{ cursor: 'pointer', borderBottom: '2px solid black', backgroundColor: 'green' }}>
            {columns[columnMeta.index]}
          </span>
        </th>
      );
    },
    customBodyRender: (value, tableMeta, updateValue) => {
      // You can add custom styling for the body cells here if needed
      return <div style={{ padding: '8px', textAlign: 'center', backgroundColor: 'green' }}>{value}</div>;
    },
  };
  const addDataSource = (dname, dsource) => {
    const updated = [...data];
    updated.push(createData(dname, dsource,"Pending"));
    setData(updated);
  };

  const handleClose = () => setOpendetail(false);

  const handleShow = (index) => {
    setOpendetail(true);
  };
  console.log("data111",data)
  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={color}>
      <CssBaseline />
      <div className="app">
        <Sidebar isSidebar={isSidebar} />
        <div className="content">
          <Topbar setIsSidebar={setIsSidebar} />
  <Box m="20px">

    <Header title="YOUR REQUESTS" subtitle="View all requests" />
  <div className="request">
  <div className="">
              <Box1/>
        
               {/* <ModalBox
                  addDataSource={(dname, dsource) => addDataSource(dname, dsource)}
                /> 
               <MUIDataTable 
                
                  data={data}
                  columns={columns}
                  options={options}
                /> */}
                
                  <Container className="listRequest">
          
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Expense</th>
                <th>Date</th>
                <th>Status</th>
                {/* <th>Actions</th> */}
                {/* <th>Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
               
                <tr key={index}>
                  <td>{item.description}</td>
                  <td>{item.requestAmount}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>
                    <TagStatus status={item.status} />
                  </td>
                  {/* <td>
                        <Button
                          variant="primary"
                          onClick={() => handleShow(index)}
                        >
                          Details
                        </Button>
                     
                      </td> */}
         
  
                </tr>
                
              ))}
            </tbody>
          </table>
        </Container>
            </div>

 
          </div>
        
  </Box>
     
  </div>
      </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
   
  );
};

export default Contacts;
const TagStatus = ({ status }) => {
  const getStyles = (status) => {
    if (status == "Pending") {
      return { backgroundColor: "#FEF9E1", color: "#E8BA02" };
    } else if (status == "ApprovedByManager" || status == "ApprovedByFinance") {
      return { backgroundColor: "#c7ffd4", color: "#16db44" };
    } else if (status == "RejectedByManager" || status == "RejectedByFinance") {
      return { backgroundColor: "#FFEBEB", color: "#DC1F18" };
    } else {
      return { backgroundColor: "#FEF9E1", color: "#E8BA02" };
    }
  };
  return (
    <span
      style={{ ...getStyles(status), padding: "4px 8px", borderRadius: "8px" }}
    >
      {status}
    </span>
  );
};
