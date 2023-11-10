import { Button, Form, Input } from "antd";
import React, { useState} from "react";
import './index.scss';
import { Link } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault();
        const apiUrl = 'http://localhost:3001/api/user/login';
        const data = {
          email: email,
          password: password,
        };
    
        try {
          const response = await axios.post(apiUrl, data);
          const token = response.data;
          if (token.status == '401'){
            toast.error('Login Failure!');
          } else {
            console.log(token);
            localStorage.setItem('userId', token.userId);
            localStorage.setItem('role', token.role);
            toast.success('Login Success');
              navigate ('/')
          }
          
        } catch (error) {
          console.error('Login failed:', error);
        }
      };
    return (
        
        <Container style = {{marginTop: "50px"}}> 
         <ToastContainer />
            <Row>
                <Col  >
            <h2 className="wrapper__register-title" style = {{marginLeft: "150px"}}>Đăng nhập</h2>
            <div>
                <Form
                    name="register-form"
                    layout="vertical"
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: "700px",
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    className="wrapper__form"
                    autoComplete="off"
                >
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập email",
                            },
                        ]}
                        label="Email"
                        name="email"
                    >
                        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mật khẩu!",
                            },
                        ]}
                    >
                        <Input.Password placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="wrapper__register-button"
                            width = "100%"
                            onClick={handleLogin}
                        >
                            Đăng nhập
                           
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="wrapper__navigate">
                <div className="wrapper__to-register">
                    Chưa có tài khoản?
                    <Link to={"/register"}>
                        <span>Đăng ký</span>
                    </Link>
                </div>
                <div className="wrapper__forgot">
                    <Link to={"/forgot-password"}>
                        <span>Quên mật khẩu</span>
                    </Link>
                </div>
            </div>
            </Col>
            <Col>
            <img 
                src = "https://peoplespheres.com/wp-content/uploads/2021/06/expense.png-reduced.png"
                width  = "100%"
                height = "100%"
                alt = "login"
            >

            </img>
            </Col>
            </Row>
        </Container>
    );
};

export default Login;