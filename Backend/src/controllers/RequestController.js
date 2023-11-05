
const Request = require('../models/RequestModel');
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
    const request = await RequestService.getAllRequestsOfAnUser(req.body.userId);
    if (!request) throw Error('Request not found');
    res.status(200).json(request);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}


// UPDATE
const updateRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!request) throw Error('Request not found');
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
  updateRequest,
  deleteRequest,
  getAllRequests
}
