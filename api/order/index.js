const express = require('express');

const router = express.Router();
const orderController = require('./orderController');

// router.get(orderController.printdeat());

router.get('/:sid',orderController.getOrders);

// router.post();

// router.patch();

// router.delete();

module.exports = router;