import React, { useState } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { backendURL } from "../requests/endpoint";

const Box1 = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [state, setState] = useState({
    name: '',
    expense: '',
    description: '',
  });

  const handleChange = (field) => (event) => {
    setState({
      ...state,
      [field]: event.target.value,
    });
  };

  const handlePostRequest = async(e) => {
    e.preventDefault()
    const userId = localStorage.getItem('userId')
    const apiUrl = backendURL+'/api/request/';
    const datapost = {
      createdBy: userId,
      name: state.name,
      description: state.description,
      requestAmount: state.expense,
    }     
    try {
        const response = await axios.post(apiUrl, datapost);
        const token = response.data;
   
        
          await axios.get(backendURL + `/api/request/${userId}`);
        
      } catch (error) {
        console.error('Login failed:', error);
      }
    handleClose();
  };

  return (
    <div className="create-button">
      <Button
        variant="contained"
        color="primary"
        onClick={handleShow}
        style={{ marginBottom: '10px' }}
      >
        Create New
      </Button>

      <Modal show={show} onHide={handleClose} aria-labelledby="form-dialog-title">
        <Modal.Header closeButton style={{ display: 'flex' }}>
          <Modal.Title id="form-dialog-title" style={{ textAlign: 'center', textDecoration: 'none' }}>
            Create Request
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} controlId="name" style={{ marginBottom: '10px' }}>
              <Form.Label column sm="4" style={{ fontWeight: 'bold' }}>
                Name
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  autoFocus
                  type="text"
                  value={state.name || ''}
                  onChange={handleChange('name')}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="expense" style={{ marginBottom: '10px' }}>
              <Form.Label column sm="4" style={{ fontWeight: 'bold' }}>
                Expense
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  autoFocus
                  type="text"
                  value={state.expense || ''}
                  onChange={handleChange('expense')}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="description" style={{ marginBottom: '10px' }}>
              <Form.Label column sm="4" style={{ fontWeight: 'bold' }}>
                Description
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  autoFocus
                  as="textarea"
                  rows={3}
                  value={state.description || ''}
                  onChange={handleChange('description')}
                />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handlePostRequest}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Box1;
