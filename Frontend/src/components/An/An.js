import React, { useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome} from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import "react-pro-sidebar/dist/css/styles.css";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import "./An.scss";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Dropdown from 'react-bootstrap/Dropdown';
import ReactSearchBox from "react-search-box";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';


const An = () => {
    const [menuCollapse, setMenuCollapse] = useState(false)
    const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };
    let isLoggedIn = 0;
    const [isDropdown, setIsDropdown] = useState(false);
    const handleDropdown = () => {
        setIsDropdown(!isDropdown);
    }
    const [books, setBooks] = useState([
        { id: 1, title: 'Book 1', author: 'Author 1', publisher: 'Publisher 1', addedDate: '2023-11-08' },
        { id: 2, title: 'Book 2', author: 'Author 2', publisher: 'Publisher 2', addedDate: '2023-11-09' },
        { id: 3, title: 'Book 3', author: 'Author 3', publisher: 'Publisher 3', addedDate: '2023-11-10' },
      ]);
    
      const handleEdit = (bookId) => {
        console.log(`Edit book with ID ${bookId}`);
      };
    
      const handleDelete = (bookId) => {
        console.log(`Delete book with ID ${bookId}`);
      };
  return (
    <Container>
        <Row xs = {12}>
            <Col xs = {2}>
            <div id="header" >
                    <ProSidebar collapsed={menuCollapse} >
                    <SidebarHeader>
                    <div className="logotext">
                        <img 
                            src = "https://scontent.fsgn2-8.fna.fbcdn.net/v/t1.15752-9/386836899_870323584364943_6358487020947453259_n.png?_nc_cat=102&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeGWCf0xJmlaLrqAaDXby7OEXZFLH-hWRwddkUsf6FZHB3UKsfIXDxZ9KbfRs02Sx9rI6zydhecslehMCBOI8aok&_nc_ohc=Tygju_LbDN4AX9UuK_g&_nc_ht=scontent.fsgn2-8.fna&oh=03_AdRXCJfwckbsuh-78QcnkZXfXpgY2s-fj3sJ36WsgzGqGA&oe=65730D9D"
                            marginLeft = "50px"
                            height = "200px"
                            width = "150px"
                        />
                        </div>
                        
                    </SidebarHeader>
                    <SidebarContent>
                        <Menu iconShape="square">
                        <MenuItem active={true} icon={<FiHome />}>
                            <span style = {{fontWeight: "600", color: "black"}}>Danh sách</span>
                        </MenuItem>
                        <MenuItem active={true} icon={<FaList />}>
                            <span style = {{fontWeight: "600", color: "black"}}>Thống kê</span>
                        </MenuItem>
                        <MenuItem active={true} icon={<RiPencilLine />}>
                            <span style = {{fontWeight: "600", color: "black"}}>Thông tin</span>
                        </MenuItem>
                        {/* <MenuItem active={true} icon={<PlaylistAddIcon/>}></MenuItem> */}
                        </Menu>
                    </SidebarContent>
                    <SidebarFooter>
                    
                    </SidebarFooter>
                    </ProSidebar>
                </div>
            </Col>
            <Col style = {{width: "100%"}}>
                <Row>
                {isLoggedIn ? (
                    <Dropdown className = "headerLogin">
                            
                            <div className = "headerName" style={{marginTop: "15px", marginLeft: "900px"}}>an.lequoc21</div>
                            <Dropdown.Toggle style = {{backgroundColor: "white",border: "none", width : "100%"}}>
                                <img
                                    src = "https://khoinguonsangtao.vn/wp-content/uploads/2022/06/avatar-hai-vit-trang-cat-dau-moi.jpg" 
                                    alt="User Avatar"
                                    className = "headerUserAvatar"
                                    onClick = {handleDropdown}
                                    width= "50px"
                                    height = "50px"
                                ></img>
                        
                            </Dropdown.Toggle>
                    
                            <Dropdown.Menu>
                                            <Dropdown.Item style = {{display: "flex", flexDirection: "column"}}>
                                                <NavLink to="/home">
                                                    Personal Information
                                                </NavLink>
                                            </Dropdown.Item>
                                            <Dropdown.Item style = {{display: "flex", flexDirection: "column"}}>
                                                <NavLink to="/request">
                                                    Request
                                                </NavLink>
                                            </Dropdown.Item>
                                            <Dropdown.Divider/>
                                            <Dropdown.Item style = {{display: "flex", flexDirection: "column"}}>
                                                <NavLink to="/request">
                                                    Log out
                                                </NavLink>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                            </Dropdown>
                        
                        
                    ): (    
                        <div style = {{display: "flex", marginLeft: "900px",marginTop: "15px"}}>
                        <NavLink to="/login">
                            <Button className="btn btn-md justify-content-md-end" style = {{marginRight: "10px"}} variant="outline-success">
                                Đăng nhập
                            </Button>{' '}
                        </NavLink>
                        <NavLink to="/register">
                            <Button className="btn btn-md justify-content-md-end" variant="outline-success">
                                Đăng ký
                            </Button>
                        </NavLink>
                        </div >
                    )}
                </Row>
                <Row>
                <bold style = {{fontSize: "40px", fontWeight: "700"}}>Quản lý danh sách của thư viện</bold>
                </Row>
                <Row style = {{width: "100%", marginTop: "15px"}}>
                        <Col style = {{width: "100%"}}>
                        <ReactSearchBox
                        width = "150%"
                        placeholder="Search Here..."
                        />
                        </Col>
                        <Col style = {{display: "flex"}}>
                        <Button variant="outlined" color="primary" style = {{width: "80px", marginRight: "20px"}}>Search</Button>

                        <Button variant="outlined" color="secondary" style = {{width: "120px"}}>Thêm sách</Button>
                        </Col>
                </Row>
                <Row style = {{width: "100%", marginTop: "30px"}}>
                <TableContainer component={Paper} style = {{border: "3px solid grey"}}>
                    <Table>
                        <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Tiêu đề</TableCell>
                            <TableCell>Tác giả</TableCell>
                            <TableCell>Nhà xuất bản</TableCell>
                            <TableCell>Ngày thêm sách</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {books.map((book) => (
                            <TableRow key={book.id}>
                            <TableCell>{book.id}</TableCell>
                            <TableCell>{book.title}</TableCell>
                            <TableCell>{book.author}</TableCell>
                            <TableCell>{book.publisher}</TableCell>
                            <TableCell>{book.addedDate}</TableCell>
                            <TableCell>
                                <Button variant="outlined" color="primary" style = {{marginRight: "15px"}} onClick={() => handleEdit(book.id)}>Chỉnh sửa</Button>
                                <Button variant="outlined" color="secondary" onClick={() => handleDelete(book.id)}>Xóa</Button>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </Row>
            </Col>
        </Row>
    </Container>
  );
};

export default An;