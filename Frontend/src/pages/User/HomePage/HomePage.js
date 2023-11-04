import React, {useState} from 'react';
import './HomePage.scss'
import Header from '../Header/Header'
import Container from 'react-bootstrap/Container';
import { Button, Form, Input } from "antd";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import TextArea from 'rc-textarea';

function SearchJob() {
    const [request, setRequest] = useState("")
    const [price, setPrice] = useState(0)
    const handlePostRequest = async (e) => {
        e.preventDefault()
        const apiUrl = 'http://localhost:3001/api/user/login';
        const data = {
          request: request,
          price: price
        }     
        try {
            const response = await axios.post(apiUrl, data);
            const token = response.data;
            console.log(token);
          } catch (error) {
            console.error('Login failed:', error);
          }
    }
    return (
        <>
            <Header/>
            <Container  >
            <div style = {{border : "2px solid gray", width: "50%", marginLeft: "25%", marginRight:"25%", marginTop: "100px"}}>
            <big style = {{marginLeft: "40%", marginTop: "40px"}}>Request by User</big>
            <Form
                    name="register-form"
                    layout="vertical"
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        width: "100%",
                        marginTop: "50px",
                        marginLeft: "60px",
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
                                message: "Vui lòng nhập yêu cầu",
                            },
                        ]}
                        label="Request"
                        name="request"
                        >
                        <TextArea style = {{width: "120%"}} placeholder="Request" value={request} onChange={(e) => setRequest(e.target.value)}/>
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập giá tiền",
                            },
                        ]}
                    >
                        <Input style = {{width: "120%"}} placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)}/>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="wrapper__register-button"
                            width = "100%"
                            onClick={handlePostRequest}
                            style = {{
                                marginLeft: "40px"
                            }}
                            >
                            Gửi
                        </Button>
                    </Form.Item>
                </Form>
                            </div>
             
            </Container>
        </>
    );
}

export default SearchJob;