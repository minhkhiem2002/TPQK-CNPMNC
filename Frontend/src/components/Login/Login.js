import { Divider, Input } from "antd";
import React, { useState } from "react";
import "./index.scss";
import { Link } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Container from "react-bootstrap/Container";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { backendURL } from "../../requests/endpoint";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const apiUrl = backendURL + "/api/user/login";
    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(apiUrl, data);
      const token = response.data;
      if (token.status === "401") {
        toast.error("Login Failure!");
      } else {
        console.log(token);
        localStorage.setItem("userId", token.userId);
        localStorage.setItem("role", token.role);
        toast.success("Login Success");
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    // <Container style = {{marginTop: "50px"}}>
    //  <ToastContainer />
    //     <Row>
    //         <Col  >
    //     <h2 className="wrapper__register-title" style = {{marginLeft: "150px"}}>Đăng nhập</h2>
    //     <div>
    //         <Form
    //             name="register-form"
    //             layout="vertical"
    //             wrapperCol={{
    //                 span: 16,
    //             }}
    //             style={{
    //                 maxWidth: "700px",
    //             }}
    //             initialValues={{
    //                 remember: true,
    //             }}
    //             className="wrapper__form"
    //             autoComplete="off"
    //         >
    //             <Form.Item
    //                 rules={[
    //                     {
    //                         required: true,
    //                         message: "Vui lòng nhập email",
    //                     },
    //                 ]}
    //                 label="Email"
    //                 name="email"
    //             >
    //                 <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
    //             </Form.Item>

    //             <Form.Item
    //                 label="Mật khẩu"
    //                 name="password"
    //                 rules={[
    //                     {
    //                         required: true,
    //                         message: "Vui lòng nhập mật khẩu!",
    //                     },
    //                 ]}
    //             >
    //                 <Input.Password placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)}/>
    //             </Form.Item>

    //             <Form.Item>
    //                 <Button
    //                     type="primary"
    //                     htmlType="submit"
    //                     className="wrapper__register-button"
    //                     width = "100%"
    //                     onClick={handleLogin}
    //                 >
    //                     Đăng nhập

    //                 </Button>
    //             </Form.Item>
    //         </Form>
    //     </div>
    //     <div className="wrapper__navigate">
    //         <div className="wrapper__to-register">
    //             Chưa có tài khoản?
    //             <Link to={"/register"}>
    //                 <span>Đăng ký</span>
    //             </Link>
    //         </div>
    //         <div className="wrapper__forgot">
    //             <Link to={"/forgot-password"}>
    //                 <span>Quên mật khẩu</span>
    //             </Link>
    //         </div>
    //     </div>
    //     </Col>
    //     <Col>
    //     <img
    //         src = "https://peoplespheres.com/wp-content/uploads/2021/06/expense.png-reduced.png"
    //         width  = "100%"
    //         height = "100%"
    //         alt = "login"
    //     >

    //     </img>
    //     </Col>
    //     </Row>
    // </Container>
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        fluid
        style={{
          height: "90%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Row style={{ width: "100%", height: "100%" }}>
          <Col xs={6} className="p-0">
            <img
              style={{ width: "100%", height: "100%" }}
              src="https://media.istockphoto.com/id/1409387561/photo/transport-and-logistic-concept-manager-and-engineer-checking-and-control-logistic-network.webp?b=1&s=170667a&w=0&k=20&c=4o4yrhIETTmlUv2yHqpj8dpTamBfBi1pQ8haasTkv0Y="
              alt="login"
            ></img>
          </Col>
          <Col
            className="d-flex flex-column justify-content-center align-items-center"
            xs={6}
            style={{ backgroundColor: "#e9f6f7" }}
          >
            <h1 class="mb-5">Hallo! WelcomeBack</h1>
            <div style={{ width: "70%" }}>
              <Form style={{ width: "100%" }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Remember" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleLogin}>
                  Login
                </Button>
              </Form>

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
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
