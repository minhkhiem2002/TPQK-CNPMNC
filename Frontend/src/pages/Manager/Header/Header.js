import React, {useState} from 'react';
import './Header.scss'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import  Button  from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

function Header() {
    const navigate = useNavigate();
    let isLoggedIn = 1;
    const [isDropdown, setIsDropdown] = useState(false);
    const handleLogout = () => {
        navigate('/login')
    }
    const handleDropdown = () => {
        setIsDropdown(!isDropdown);
    }
    return (
        <Container className = "header">
        <Navbar expand="lg" className="nav">
            <Container>
                <Navbar.Brand href="#home" className = "nav-item is-active">Home Logo</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home" className = "nav-item" >Home</Nav.Link>
                    <Nav.Link href="#link" className = "nav-item" >About</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1" className = "nav-dropdown" >Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2" className = "nav-dropdown">
                        Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3" className = "nav-dropdown">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4" className = "nav-dropdown">
                        Separated link
                    </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#link" className = "nav-item" active-color = "rebeccapurple">Contact</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            {isLoggedIn ? (
                    <Dropdown className = "headerLogin">
                    
                    <div className = "headerName">This is Name</div>
                    <Dropdown.Toggle style = {{backgroundColor: "white",border: "none", marginRight: "-30%"}}>
                        <img
                            src = "https://khoinguonsangtao.vn/wp-content/uploads/2022/06/avatar-hai-vit-trang-cat-dau-moi.jpg" 
                            alt="User Avatar"
                            className = "headerUserAvatar"
                            onClick = {handleDropdown}
                        ></img>
                 
                    </Dropdown.Toggle>
               
                    <Dropdown.Menu>
                                    <Dropdown.Item style = {{display: "flex", flexDirection: "column"}}>
                                        <NavLink to="/home">
                                            Personal Information
                                        </NavLink>
                                        <NavLink to="/request">
                                            Request
                                        </NavLink>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                    </Dropdown>
                  
                
            ): (    
                <>
                <NavLink to="/login">
                    <Button className="btn btn-md justify-content-md-end" variant="outline-success">
                        Đăng nhập
                    </Button>{' '}
                </NavLink>
                <NavLink to="/register">
                    <Button className="btn btn-md justify-content-md-end" variant="outline-success">
                        Đăng ký
                    </Button>
                </NavLink>
                </>
            )}
                </Container>
            </Navbar>
        </Container>
    )
}
export default Header;