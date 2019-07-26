const mongoose = require('mongoose');

const superFoodSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    unique: true
  },
  benefits: {
    type: String,
    required: true,
    trim: true,
    minLength: 1
  },
  nutrients: {
    type: String,
    required: true,
    trim: true,
    minLength: 1
  },
  treatments: {
    type: String,
    required: false,
    trim: true,
    minLength: 1
  },
  price: {
    type: Number,
    required: false,
    trim: true,
    minLength: 1
  }
});

const SuperFood = mongoose.model('superFood', superFoodSchema);

module.exports = {
  SuperFood
};
