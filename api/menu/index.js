const express = require('express');

const router = express.Router();
const menuController = require('./menu.controller');

/* ************************************** */
/*                                        */
/* API ENTRY : https://{host_name}/orders */
/*                                        */
/* ************************************** */


router.post('/',menuController.createMenu);

router.get('/:menu_id',menuController.getMenu);

router.put('/:menu_id',menuController.updateMenu);

router.delete('/:menu_id',menuController.deleteMenu);

module.exports = router;