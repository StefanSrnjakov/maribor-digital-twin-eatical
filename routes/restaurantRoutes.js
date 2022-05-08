const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController.js');
const {authenticateRestaurant} = require("../middleware/authentication");
const {loginValidation} = require("../middleware/validation");

/*
 * GET
 */
router.get('/', restaurantController.list);

/*
 * GET
 */
router.get('/:id', restaurantController.show);

/*
 * POST
 */
router.post('/', restaurantController.create);
router.post('/login', loginValidation, restaurantController.login);
router.post('/logout', authenticateRestaurant, restaurantController.logout);
/*
 * PUT
 */
router.put('/:id', restaurantController.update);

/*
 * DELETE
 */
router.delete('/:id', restaurantController.remove);

module.exports = router;
