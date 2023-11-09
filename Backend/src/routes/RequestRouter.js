const express = require('express');
const router = express.Router();
const userController = require('../controllers/RequestController');
const { authMiddleware } = require('../middleWare/authMiddleWare');

router.post('/', userController.createRequest)
router.get('/', userController.getAllRequests)
router.get('/:id', authMiddleware, userController.getRequest)

module.exports = router;