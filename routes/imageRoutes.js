const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController.js');

/*
 * GET
 */
router.get('/', imageController.list);

/*
 * GET
 */
router.get('/:id', imageController.show);

/*
 * POST
 */
router.post('/', imageController.create);

/*
 * PUT
 */
router.put('/:id', imageController.update);

/*
 * DELETE
 */
router.delete('/:id', imageController.remove);

module.exports = router;
