const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/tokenController.js');

/*
 * GET
 */
router.get('/', tokenController.list);

/*
 * GET
 */
router.get('/:id', tokenController.show);

/*
 * POST
 */
router.post('/', tokenController.create);

/*
 * PUT
 */
router.put('/:id', tokenController.update);

/*
 * DELETE
 */
router.delete('/:id', tokenController.remove);

module.exports = router;
