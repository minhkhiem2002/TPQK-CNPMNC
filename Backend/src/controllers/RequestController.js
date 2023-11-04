
const Request = require('../models/RequestModel');
const RequestService = require('../services/RequestService');

// CREATE
const createRequest = async (req, res) => {
  try {
    const request = new Request(req.body);
    await request.save();
    res.status(201).json(request);
  } catch (err) {
    res.status(400).json({ error: err.message });
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
    const request = await RequestService.getAllRequestsOfAnUser(req.userId);
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
