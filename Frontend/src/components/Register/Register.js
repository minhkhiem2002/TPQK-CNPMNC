import React, {useState} from "react";
import "./Register.scss";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import axios from 'axios'
import { backendURL } from "../../requests/endpoint";
const Register = () => {
    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [confirmPassword,setConfirmPassword] = useState()
    const [department,setDepartment] = useState()
    const handleRegister = async (e) => {
        e.preventDefault();
        const apiUrl = backendURL+ '/api/user/signup';
        const data = {
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            department: department
          };
          try {
        const response = await axios.post(apiUrl, data)
        const token = response.data;
          console.log(token);
          } catch (e) {
            console.error(e)
          }
    };
    
    console.log(name,email,password,confirmPassword,department)
    return (
        <Container style = {{marginTop: "50px"}}>
            <Row>
            <Col style = {{marginRight: "50px"}}>
            <img 
                src = "https://peoplespheres.com/wp-content/uploads/2021/06/expense.png-reduced.png"
                width  = "100%"
                height = "100%"
                alt = "registerImage"
            >

            </img>
            </Col>
            <Col style = {{marginLeft: "50px"}}>
            <h2 className="wrapper__register-title">Đăng ký</h2>
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
                    onFinish={handleRegister}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Họ và tên"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên của bạn",
                            },
                        ]}
                    >
                        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Họ và tên" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập email của bạn",
                            },
                        ]}
                    >
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
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
                        <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mật khẩu" />
                    </Form.Item>

                    <Form.Item
                        label="Xác nhận mật khẩu"
                        name="confirm_password"
                        rules={[
                            {
                                required: true,
                                message: "Xác nhận mật khẩu của bạn!",
                            },
                        ]}
                    >
                        <Input.Password value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Xác nhận mật khẩu" />
                    </Form.Item>
                    <Form.Item
                        label="Department"
                        name="department"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập department của bạn",
                            },
                        ]}
                    >
                        <Input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Department" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="wrapper__register-button"
                            onClick={handleRegister}
                        >
                            Đăng ký
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="wrapper__navigate">
                Đã có tài khoản?
                <Link to={"/login"}>
                    <span>Đăng nhập</span>
                </Link>
            </div>
            </Col>
            </Row>
        </Container>
    );
};

export default Register;