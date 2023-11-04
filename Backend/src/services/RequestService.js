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





module.exports = {
    createRequest,
    getAllRequestsOfUser
}

