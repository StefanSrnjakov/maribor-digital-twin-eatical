const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController.js');
const {authenticateRestaurant} = require("../middleware/authentication");
const {loginValidation} = require("../middleware/validation");

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
router.post('/login', loginValidation, restaurantController.login);
router.post('/logout', authenticateRestaurant, restaurantController.logout);
router.post('/update', restaurantController.update_from_api);
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