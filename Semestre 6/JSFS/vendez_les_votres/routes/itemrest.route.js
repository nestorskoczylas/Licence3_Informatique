const express = require('express');
const router = express.Router();

// import controller for items
const controller = require('../controllers/item.rest.controller');

const authMiddleware = require('../middlewares/authentification.middleware');

// follows REST API conventions
// must be logged in to perform any of these operations
router.get( '/', authMiddleware.validToken, controller.allItems );
router.post( '/', authMiddleware.validToken, controller.createItem );
router.put( '/:itemId', authMiddleware.validToken, controller.buyItem );
router.delete( '/:itemId', authMiddleware.validToken, controller.deleteItem );

module.exports = router;
