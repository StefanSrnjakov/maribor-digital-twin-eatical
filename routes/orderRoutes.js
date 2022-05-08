var express = require('express');
var router = express.Router();
var orderController = require('../controllers/orderController.js');

/*
 * GET
 */
router.get('/', orderController.list);

/*
 * GET
 */
router.get('/:id', orderController.show);

/*
 * POST
 */
router.post('/', orderController.create);

/*
 * PUT
 */
router.put('/:id', orderController.update);
router.put('/claim/:id', orderController.claim); //need to add kristijan's user login authentication function
router.put('/complete/:id', orderController.complete); //need to add kristijan's restaurant login authentication function

/*
 * DELETE
 */
router.delete('/:id', orderController.remove);

module.exports = router;
