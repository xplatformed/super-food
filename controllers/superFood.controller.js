const _ = require('lodash');
const { SuperFood } = require('../models/superFood.model');
// eslint-disable-next-line import/order
const { ObjectID } = require('mongodb');

/**
 * Takes a user request and creates a new super food item
 *
 * @param {object } req The request object
 * @param {object} res The response object
 * @returns {object} new super food object
 */
// eslint-disable-next-line consistent-return
exports.create = (req, res) => {
  // Validation
  if (!req.body) {
    return res.status(400).send({
      message: 'Super Food content cannot be empty'
    });
  }

  // create super food item
  const superfood = new SuperFood({
    name: req.body.name,
    benefits: req.body.benefits,
    nutrients: req.body.nutrients,
    treatments: req.body.treatments,
    price: req.body.price
  });

  // save superFood model to database
  superfood.save().then((doc) => {
    res.send(doc);
  }).catch((err) => {
    res.status(500).send({
      message: err.message || 'Unable to save super food to database - please make sure body data is correct.'
    });
  });
};

/**
 * Takes a user request for all super food items, and returns result of search
 * to user.
 *
 * @param {object} req The request object
 * @param {object} res The response object all super food items
 */
exports.getAll = (req, res) => {
  SuperFood.find().then((superfoods) => {
    res.send({ superfoods });
  }).catch((err) => {
    res.status(500).send({
      message: err.message || 'Something went wrong unable to retrieve super food items.'
    });
  });
};

/**
 * Takes a user request for individual super food item, and returns result of search
 * to user.
 *
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {object} returns individual super food item
 */
/* eslint consistent-return:0 */
exports.findOne = (req, res) => {
  const { id } = req.params;

  // validate id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({
      message: 'Invalid id.'
    });
  }

  SuperFood.findById(id)
    .then((superfood) => {
      if (!superfood) {
        return res.status(404).send({
          message: `super Food item not found with this id ${id}`
        });
      }
      res.send({ superfood });
    }).catch((err) => {
      if (err.kind === ObjectID) {
        return res.status(404).send({
          message: `super Food item not found with this id ${id}`
        });
      }
      return res.status(500).send({
        message: `Something went wrong retrieving super food item with id.${id}`
      });
    });
};

/**
 *  Takes a user request to remove a super food item and returns removed item to user.
 *
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {object} returns individual super food item
 */
exports.delete = (req, res) => {
  const { id } = req.params;

  // validate id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({
      message: 'Invalid id.'
    });
  }

  SuperFood.findOneAndDelete({ _id: id }).then((superfood) => {
    if (!superfood) {
      return res.status(404).send({
        message: `Cannot find super food item with id ${req.params.id}`
      });
    }
    res.send({ superfood });
  }).catch((err) => {
    if (err.kind === ObjectID) {
      return res.status(404).send({
        message: `Cannot find super food item with id ${req.params.id}`
      });
    }
    return res.status(500).send({
      message: `Could not delete super food item with id ${req.params.id}`
    });
  });
};

/**
 * Takes user request to update a super food item and returns updated item to user
 *
 * @param req {object} req The request object
 * @param res{object} res The response object
 * @returns {object} returns individual super food item
 */
exports.update = (req, res) => {
  const { id } = req.params;
  const body = _.pick(req.body, ['name', 'benefits', 'nutrients', 'treatments', 'price']); // pick method updates just the properties we want users to be able to update if  the property exists

  // validate id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({
      message: 'Invalid id.'
    });
  }

  SuperFood.findOneAndUpdate({ _id: id },
    { $set: body }, { new: true })
    .then((superfood) => {
      if (!superfood) {
        return res.status(404).send({
          message: `Cannot find super food item with id ${req.params.id}`
        });
      }
      res.send({ superfood });
    }).catch((err) => {
      if (err.kind === ObjectID) {
        return res.status(404).send({
          message: `Cannot find super food item with id ${req.params.id}`
        });
      }
      return res.status(500).send({
        message: `Could not update super food item with id ${req.params.id} please try again later ...`
      });
    });
};
