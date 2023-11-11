
const Request = require('../models/RequestModel');
const User = require('../models/UserModel');
const RequestService = require('../services/RequestService');

// CREATE
const createRequest = async (req, res) => {
  try {
    const request = await RequestService.createRequest(req.body);
    res.status(201).json({
      status: 'OK',
      message: 'CREATED REQUEST SUCCESSFULLY',
      data: request
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// READ
const getRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) throw Error('Request not found');
    res.status(200).json(request);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const getAllRequests = async (req, res) => {
  try {
    console.log("req.body.userId",req.body)
    const request = await RequestService.getAllRequestsOfAnUser(req.body.userId);
    if (!request) throw Error('Request not found');
    res.status(200).json(request);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}


// UPDATE
const updateRequestStatus = async (req, res) => {
  try {
    const { userId, status, feedback } = req.body;
    const requestId = req.params.id;
    
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    let update = {};
    switch (user.role) {
      case 'user':
        throw new Error('User is not authorized to update request status');
      case 'manager':
        if (status != 'Pending') {
          // throw new Error('This request is already approved/rejected');
        }
        update.managerId = userId;
        break;
      case 'finance':
        if(status == 'RejectedByFinance' || status == 'ApprovedByFinance'){
          // throw new Error('This request is already checked by finance');
        }
        update.financeId = userId;
        break;
      default:
        throw new Error('Invalid user role');
    }
    update.status = status;
    if(user.role == 'manager' && feedback != ""){
      update.managerFeedback = feedback;
    }
    else if(user.role == 'finance' && feedback != ""){
      update.financeFeedback = feedback;
    }
    const request = await Request.findByIdAndUpdate(requestId, update, { new: true });
    if (!request) {
      throw new Error('Request not found');
    }
    res.status(200).json(request);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// DELETE
const deleteRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndDelete(req.params.id);
    if (!request) throw Error('Request not found');
    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};


module.exports = {
  createRequest,
  getRequest,
  updateRequestStatus,
  deleteRequest,
  getAllRequests
}
