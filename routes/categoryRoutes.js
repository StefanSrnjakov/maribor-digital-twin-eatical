const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController.js');

/*
 * GET
 */
router.get('/', categoryController.list);

/*
 * GET
 */
router.get('/:id', categoryController.show);

/*
 * POST
 */
router.post('/', categoryController.create);

/*
 * PUT
 */
router.put('/:id', categoryController.update);

/*
 * DELETE
 */
router.delete('/:id', categoryController.remove);

module.exports = router;
