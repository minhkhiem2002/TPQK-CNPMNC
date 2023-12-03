import React, {useState} from 'react';
import './Header.scss'
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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
    )
}
export default Header;