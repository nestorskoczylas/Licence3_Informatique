const express = require('express');
const router = express.Router();


const indexController = require('../controllers/index.controller');

const authMiddleware = require('../middlewares/authentification.middleware');

/* GET home page. */
router.get('/', indexController.home);

/* GET items page. */
router.get('/itemsSPA', authMiddleware.validToken, indexController.itemsSPA );

module.exports = router;
