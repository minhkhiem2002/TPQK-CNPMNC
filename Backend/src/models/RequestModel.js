const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema(
    {
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50
        },
        managerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        financeId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        status: {
            type: String,
            enum: ['Pending', 'ApprovedByManager', 'RejectedByManager', 'ApprovedByFinance', 'RejectedByAdmin'],
            default: 'Pending'
        },
        adminFeedback: {
            type: String,
            trim: true,
            maxLength: 50
        },
        financeFeedback: {
            type: String,
            trim: true,
            maxLength: 50
        },
        requestAmount: {
            type: Number,
            required: true,
        }
    },
    { timestamps: true }
)


export const Request = mongoose.model("Request", requestSchema);