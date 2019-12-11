const express = require('express');

const router = express.Router();
const storeController = require('./store.controller');

/* ************************************** */
/*                                        */
/* API ENTRY : https://{host_name}/store  */
/*                                        */
/* ************************************** */

// router.get(orderController.printdeat());

router.post('/',storeController.registerStore);

router.post('/user',storeController.registerUser);

router.post('/:sid/orders',storeController.createOrder);

router.get('/:sid/orders',storeController.getCurrentOrder);

router.get('/:sid/orders/history',storeController.getOrderHistory);

router.patch('/:sid/orders/:oid',storeController.updateOrder);
// flag에 따라 update order 혹은 completeorder

// router.post()

// router.post();

// router.patch();

// router.delete();

module.exports = router;