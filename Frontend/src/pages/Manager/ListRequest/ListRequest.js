import React, { useState,useEffect } from "react";
import "./ListRequest.scss";
import Container from "react-bootstrap/esm/Container";
import { Button, Modal } from "react-bootstrap";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../../theme";
import Topbar from "../../../pages/global/Topbar";
import Sidebar from "../../../pages/global/Sidebar";
import AdminRequest from "../../../requests/admin-request";

const initialData = [
  { name: "John Doe", expense: 100, reason: "Business lunch" },
  { name: "Jane Doe", expense: 200, reason: "Office supplies" },
];

function ListRequest() {
  const [data, setData] = useState(initialData);
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [color, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const handleClose = () => setShow(false);

  const handleShow = (index) => {
    setSelectedExpense(data[index]);
    setShow(true);
  };
  const fetchRequests = async () => {
    let data = await AdminRequest.getAllRequest();
    console.log(data)
    setData(data.map(_record => ({
      id: _record._id,
      name: _record.createdBy.name,
      expense: _record.requestAmount,
      createdAt: _record.createdAt,
      status: _record.status,
      reason: _record.description,
      managerFeedback: _record.managerFeedback,
      financeFeedback: _record.financeFeedback
    })))
  }
  useEffect(() => {

    fetchRequests()
  }, []);
  const handleApprove = async () => {
    if (selectedExpense) {
      setIsLoading(true)
      await AdminRequest.updateStatus(selectedExpense.id,"approve",comment)
      await fetchRequests()
      handleClose()
      setIsLoading(false)

    }
  };

  const handleReject = async () => {
    if (selectedExpense) {
      setIsLoading(true)
      await AdminRequest.updateStatus(selectedExpense.id,"reject",comment)
      await fetchRequests()
      handleClose()
      setIsLoading(false)
    }
  };

  return (

      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={color}>
          <CssBaseline />
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />

              <Container className="listRequest">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Expense</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.expense}</td>
                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td><TagStatus status={item.status}/></td>
                        <td>
                          <Button
                            variant="primary"
                            onClick={() => handleShow(index)}
                          >
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
                      {
                        selectedExpense?.managerFeedback && (                       <p>Manager Feedback: {selectedExpense?.managerFeedback}</p>
                        )
                      }
                         {
                        selectedExpense?.financeFeedback && (                       <p>Finance Feedback: {selectedExpense?.financeFeedback}</p>
                        )
                      }
                    </div>
                  )}
                </Modal.Body>
                {
                  (!selectedExpense?.managerFeedback && !selectedExpense?.financeFeedback) &&      <Modal.Footer>
                  <Button variant="success" onClick={handleApprove} >
                    {!isLoading? "Approve" : "waiting"}
                  </Button>
                  <Button variant="danger" onClick={handleReject}>
                    {!isLoading ? "Reject" : "waiting"}
                  </Button>
                  <input
                    type="text"
                    placeholder="Comment"
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Modal.Footer>
                }
           
              </Modal>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
  );
}

export default ListRequest;


const TagStatus = ( {status} ) => {
  const getStyles = (status) => {
    if (status == "Pending") {
      return { backgroundColor: "#FEF9E1", color: "#E8BA02" };
    } else if (status == "ApprovedByManager" || status == "ApprovedByFinance") {
      return { backgroundColor: "#FFEBEB", color: "#DC1F18" };
    } else if (status == "RejectedByManager" || status == "RejectedByFinance") {
      return { backgroundColor: "#FFEBEB", color: "#DC1F18" };
    } else {
      return { backgroundColor: "#FEF9E1", color: "#E8BA02" };
    }
  };
  return (
    <span style={{...getStyles(status),padding: "4px 8px", borderRadius:"8px"}}>
      {status}
    </span>
  );
};