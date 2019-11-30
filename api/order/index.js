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

router.post('/:sid',orderController.createOrder);

router.patch('/:sid/:oid',orderController.updateOrder);
// flag에 따라 update order 혹은 completeorder

// router.post()

// router.post();

// router.patch();

// router.delete();

module.exports = router;