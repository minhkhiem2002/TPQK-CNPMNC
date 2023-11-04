const Request = require('../models/RequestModel')
const User = require('../models/UserModel')

const createRequest = async (newRequest) => {
    const { createdBy, description, requestAmount } = newRequest
    try {
        const createdRequest = await Request.create({
            createdBy,
            description,
            requestAmount
        })
        if (createdRequest) {
            return {
                status: 'OK',
                message: 'SUCCESS',
                data: createdRequest
            }
        }
    } catch (e) {
        throw e;
    }
}


const getAllRequestsOfAnUser = async (userId) => {
    try {
        const user = await User.findOne({
            
        })
        const requests = await Request.find({
            createdBy: userId
        })
        return {
            status: 'OK',
            message: 'SUCCESS',
            data: requests
        }
    } catch (e) {
        throw e;
    }
}

const updateRequestFromManager = async (requestId, approved, comment) => {
    try {
        const request = await Request.findOne({
            _id: requestId
        })
        if (request == NULL || request.status != 'Pending') {
            //error
        }
        if (approved) {
            newStatus = 'ApprovedByManager';
        } else {
            newStatus = 'RejectedByManager'
        }
        request.status = newStatus;
        request.managerFeedback = comment;
        request.save();
    } catch (e) {
        throw e;
    }
}

const updateRequestFromFinance = async (requestId, approved, comment) => {
    try {
        const request = await Request.findOne({
            _id: requestId
        })
        if (request == NULL || request.status != 'ApprovedByManager') {
            //error
        }
        if (approved) {
            newStatus = 'ApprovedByFinance';
        } else {
            newStatus = 'RejectedByFinance'
        }
        request.status = newStatus;
        request.financeFeedback = comment;
        request.save();
    } catch (e) {
        throw e;
    }
}

module.exports = {
    createRequest,
    getAllRequestsOfUser
}

