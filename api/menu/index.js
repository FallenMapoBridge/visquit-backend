const express = require('express');

const router = express.Router();
const menuController = require('./menu.controller');

/* ************************************** */
/*                                        */
/* API ENTRY : https://{host_name}/menu */
/*                                        */
/* ************************************** */


router.post('/', menuController.createMenu);

router.get('/', menuController.getMenus);

router.get('/:menu_id', menuController.getMenuInfo);

router.put('/:menu_id', menuController.updateMenu);

router.delete('/:menu_id', menuController.deleteMenu);

module.exports = router;