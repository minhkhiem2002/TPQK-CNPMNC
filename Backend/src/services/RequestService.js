const Request = require('../models/RequestModel')
const User = require('../models/UserModel')

const createRequest = async (newRequest) => {
    const { createdBy, description, requestAmount, dateOfRequest } = newRequest
    const request = new Request(newRequest)
    await request.save();
    return request;
}

const getAllRequestsOfAnUser = async (userId) => {
    try {
        const user = await User.findOne({
            _id: userId
        })
        let matchCondition = [];
        if (user.role == 'user') {
            matchCondition.push({
                createdBy: userId
            })
        }
        else if (user.role == 'manager') {
            matchCondition.push({
                status: ['ApprovedByManager', 'RejectedByManager', 'Pending']
            })
        }
        else if (user.role == 'finance') {
            matchCondition.push({
                status: ['ApprovedByManager', 'ApprovedByFinance', 'RejectedByFinance']
            })
        }
        const requests = await Request.find({
            $or: matchCondition
        }).populate('createdBy', 'name email role -_id')
        return {
            status: 'OK',
            message: 'SUCCESS',
            data: requests
        }
    } catch (e) {
        throw e;
    }
}





module.exports = {
    createRequest,
    getAllRequestsOfAnUser,
    
}

