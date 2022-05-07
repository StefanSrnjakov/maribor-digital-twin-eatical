var express = require('express');
var router = express.Router();
var mealController = require('../controllers/mealController.js');

/*
 * GET
 */
router.get('/', mealController.list);

/*
 * GET
 */
router.get('/:id', mealController.show);

/*
 * POST
 */
router.post('/', mealController.create);

/*
 * PUT
 */
router.put('/:id', mealController.update);

/*
 * DELETE
 */
router.delete('/:id', mealController.remove);

module.exports = router;
