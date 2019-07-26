const express = require('express');

const router = express.Router();

// eslint-disable-next-line camelcase
const superfoodController = require('../controllers/superFood.controller');

// eslint-disable-next-line camelcase
// const {
//   getAll, findOne, create, delete: delete1, update
// } = superfoodController;

router.get('/', superfoodController.getAll);
router.post('/superfoods', superfoodController.create);
router.get('/superfoods/:id', superfoodController.findOne);
router.delete('/superfoods/:id', superfoodController.delete);
router.patch('/superfoods/:id', superfoodController.update);

module.exports = router;
