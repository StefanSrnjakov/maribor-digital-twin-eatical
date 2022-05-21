const express = require('express');
const router = express.Router();
const allergenController = require('../controllers/allergenController.js');

/*
 * GET
 */
router.get('/', allergenController.list);

/*
 * GET
 */
router.get('/:id', allergenController.show);

/*
 * POST
 */
router.post('/', allergenController.create);

/*
 * PUT
 */
router.put('/:id', allergenController.update);

/*
 * DELETE
 */
router.delete('/:id', allergenController.remove);

module.exports = router;
