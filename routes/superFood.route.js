const express = require('express');

const router = express.Router();

const superfoodController = require('../controllers/superFood.controller');

router.get('/', superfoodController.getAll);
router.post('/superfoods', superfoodController.create);
router.get('/superfoods/:id', superfoodController.findOne);
router.delete('/superfoods/:id', superfoodController.delete);
router.patch('/superfoods/:id', superfoodController.update);

module.exports = router;
