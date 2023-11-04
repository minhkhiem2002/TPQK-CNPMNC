const Request = require('../models/RequestModel')
const User = require('../models/UserModel')

const createRequest = async (newRequest) => {
    const { createdBy, description, requestAmount } = newRequest
    try {
        const request = new Request(newRequest)
        await request.save();
        return {
            status: 'OK',
            message: 'SUCCESS',
            data: res.status(201).json(request)
        }

    } catch (e) {
        res.status(400).json({ error: err.message });
    }
}


const getAllRequestsOfAnUser = async (userId) => {
    try {
        const user = await User.findOne({
            userId
        })
        let matchCondition = [{}];
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





module.exports = {
    createRequest,
    getAllRequestsOfAnUser
}

