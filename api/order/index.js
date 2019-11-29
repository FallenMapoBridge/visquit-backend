const express = require('express');

const router = express.Router();
const orderController = require('./order.controller');

/* ************************************** */
/*                                        */
/* API ENTRY : https://{host_name}/orders */
/*                                        */
/* ************************************** */

// router.get(orderController.printdeat());

router.get('/:sid',orderController.getOrders);

// router.post()

// router.post();

// router.patch();

// router.delete();

module.exports = router;