const express = require('express');
const router = express.Router();
const userController = require('../controllers/RequestController');
const { authMiddleware } = require('../middleWare/authMiddleWare');

router.post('/', userController.createRequest)
router.post('/getRequests', userController.getAllRequests)
router.get('/:id', authMiddleware, userController.getRequest)
router.post('/update/:id', userController.updateRequestStatus)

module.exports = router;