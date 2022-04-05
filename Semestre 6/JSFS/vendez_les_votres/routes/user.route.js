const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authentification.middleware');

// import controller for index
const userController = require('../controllers/user.controller');

router.get('/', userController.home );
router.get('/me', authMiddleware.validToken, userController.me );
router.put('/me', authMiddleware.validToken, userController.userupdate );

module.exports = router;
