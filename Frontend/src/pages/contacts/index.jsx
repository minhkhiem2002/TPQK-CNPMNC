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
function ModalBox(props) {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    dname: "",
    dsource: ""
  });
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
    const apiUrl = 'http://localhost:3001/api/request/';
    const datapost = {
      createdBy: userId,
      description: state.dname,
      requestAmount: state.dsource
    }     
    try {
        const response = await axios.post(apiUrl, datapost);
        const token = response.data;
        console.log(token);
        
          await axios.get(apiUrl);
        
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
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Create New
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
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
          {/* <Select
            native
            fullWidth
            value={state.dsource || ""}
            onChange={handleChange("dsource")}
          >
            <option value="" />
            <option value={"mssql"}>mssql</option>
            <option value={"oracle"}>oracle</option>
          </Select> */}
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

  const columns = ["Id", "Name", "Provider", "Status"];
  const [data, setData] = useState([]);

  let id = 0;
  function createData(name, provider, status) {
    id += 1;
    return [id, name, provider, status];
  }

  // useEffect(() => {
  //   // const data = [
  //   //   createData("Dummy1", "oracle"),
  //   //   createData("Dummy2", "mssql"),
  //   //   createData("Dummy3", "oracle")
  //   // ];
  //   // setData(data);
  // }, []);
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/request/');
        const newData = response.data.data.map((item, index) => [
          index + 1,
          item.description,
          item.requestAmount,
          item.status,
        ]);
  
        console.log("New data", newData);
  
        // Cập nhật state với mảng mới
        setData(newData);
  
        console.log("Data", data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const options = {
    filterType: "checkbox"
  };

  const addDataSource = (dname, dsource) => {
    const updated = [...data];
    updated.push(createData(dname, dsource,"Pending"));
    setData(updated);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={color}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <div className="f-height fx-column-cont">
          <div>
            <ModalBox
              addDataSource={(dname, dsource) => addDataSource(dname, dsource)}
            />
            <MUIDataTable
              title={"Test Source"}
              data={data}
              columns={columns}
              options={options}
            />
          </div>
        </div>
      </Box>
    </Box>
    </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Contacts;
