const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const {authenticateUser} = require("../middleware/authentication");
const {registerValidation, loginValidation} = require("../middleware/validation");

/*
 * GET
 */
router.get('/', userController.list);

/*
 * GET
 */
router.get('/:id', userController.show);

/*
 * POST
 */
router.post('/', userController.create);
router.post('/register', registerValidation, userController.register);
router.post('/login', loginValidation, userController.login);
router.post('/logout', authenticateUser, userController.logout);


/*
 * PUT
 */
router.put('/:id', userController.update);

/*
 * DELETE
 */
router.delete('/:id', userController.remove);

module.exports = router;
