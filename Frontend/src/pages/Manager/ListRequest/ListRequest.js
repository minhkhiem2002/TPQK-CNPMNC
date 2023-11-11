import React, { useState } from "react";
import "./ListRequest.scss";
import Container from "react-bootstrap/esm/Container";
import { Button, Modal } from "react-bootstrap";

const initialData = [
  { name: "John Doe", expense: 100, reason: "Business lunch" },
  { name: "Jane Doe", expense: 200, reason: "Office supplies" },
];

function ExpenseTable() {
  const [data, setData] = useState(initialData);
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState('');
  const [selectedExpense, setSelectedExpense] = useState(null);

  const handleClose = () => setShow(false);

  const handleShow = (index) => {
    setSelectedExpense(data[index]);
    setShow(true);
  };

  const handleApprove = () => {
    if (selectedExpense) {
      console.log(selectedExpense);
      alert(`Expense approved with comment: ${comment} for ${selectedExpense.name}`);
    }
  };

  const handleReject = () => {
    if (selectedExpense) {
      alert(`Expense rejected with comment: ${comment} for ${selectedExpense.name}`);
    }
  };

  return (
    <div>
      <Container className="listRequest">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Expense</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.expense}</td>
                <td>{new Date().toLocaleDateString()}</td>
                <td>
                  <Button variant="primary" onClick={() => handleShow(index)}>
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Expense Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedExpense && (
            <div>
              <p>Name: {selectedExpense.name}</p>
              <p>Expense: {selectedExpense.expense}</p>
              <p>Reason: {selectedExpense.reason}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleApprove}>
            Approve
          </Button>
          <Button variant="danger" onClick={handleReject}>
            Reject
          </Button>
          <input type="text" placeholder="Comment" onChange={(e) => setComment(e.target.value)} />
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ExpenseTable;
