const express = require('express');
const router = express.Router();

const errorController = require('../controllers/error.controller');

// catch 404 and forward to error handler
router.use(errorController.notFound);
// error handler
router.use(errorController.handleError);

module.exports = router;
