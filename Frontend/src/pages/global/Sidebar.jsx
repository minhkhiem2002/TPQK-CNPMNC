import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import ListRequest from "../Manager/ListRequest/ListRequest";
import {  useEffect } from "react";
import axios from 'axios'
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};
const initial=[{name:"",department:""}]

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const userRole = localStorage.getItem("role");
  const [user,setUser]=useState(initial);
  const [isUser, setIsUser] = useState(userRole === 'user' ? true : false);
  const [isManager, setIsManager] = useState(userRole === 'manager' ? true : false);
  const [isFinancial, setIsFinancial] = useState(userRole === 'financial' ? true : false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId')
     
        const userName = (await axios.get(`http://localhost:3001/api/user/get-detail/${userId}`)).data.data;
        setUser(userName);
  
     
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  TQPK
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user.name}
                
               
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                Department:  {user.department} 
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"} >
           
            {
              <>
                {userRole === "user" ? (
                  <>
                   {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "10px 0 0 0" }}
            >
              Employee
            </Typography> */}
                    <Item
                      title="Request"
                      to="/"
                      icon={<ContactsOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                   
                    <Item
                      title="Profile"
                      to="/form"
                      icon={<PersonOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  
                  </>
                ) : userRole === "manager" ? (
                  <>
                    
                    <Item
                      title="Manager Request"
                      to="/adminRequest"
                      icon={<ReceiptOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                   
                    <Item
                      title="Profile"
                      to="/form"
                      icon={<PersonOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                   
                  </>
                ) : userRole === "finance" ? (
                  <>
                  
                    <Item
                      title="Finance Request"
                      to="/financeRequest"
                      icon={<ReceiptOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                 
                    <Item
                      title="Profile Form"
                      to="/form"
                      icon={<PersonOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                   
                  </>
                ) : (
                  <>{/* Nội dung cho các trường hợp khác */}</>
                )}
              </>
            }
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
