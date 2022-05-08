var express = require('express');
var router = express.Router();
var restaurantController = require('../controllers/restaurantController.js');

/*
 * GET
 */
router.get('/', restaurantController.list);
router.get('/nearby', restaurantController.list_nearby);

/*
 * GET
 */
router.get('/:id', restaurantController.show);

/*
 * POST
 */
router.post('/', restaurantController.create);

/*
 * PUT
 */
router.put('/:id', restaurantController.update);
router.put('/rate/:id', restaurantController.rate);

/*
 * DELETE
 */
router.delete('/:id', restaurantController.remove);

module.exports = router;
