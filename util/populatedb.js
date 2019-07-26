#! /usr/bin/env node

// console.log(
//   'This script populates some super foods items to the database. Specified database as argument - e.g.: populatedb mongodb+srv://yourusername:youruserpassword@cluster0-mbdj7.mongodb.net/superfoods?retryWrites=true'
// );

// Get arguments passed on command line
// const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require('async');
// const mongoose = require('mongoose');
const { mongoose } = require('../db/mongoose_connection');
const { SuperFood } = require('../models/superFood.model');

// const mongoDB = userArgs[0];
// mongoose.connect(mongoDB, { useNewUrlParser: true });
// mongoose.Promise = global.Promise;
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// empty superfoods array
const superfoods = [];

function superfoodCreate(name, benefits, nutrients, treatments, price, cb) {
  // cb .. callback optional
  const superfoodDetail = { name };
  if (benefits !== false) superfoodDetail.benefits = benefits;
  if (nutrients !== false) superfoodDetail.nutrients = nutrients;
  if (treatments !== false) superfoodDetail.treatments = treatments;
  if (price !== false) superfoodDetail.price = price;

  const superfood = new SuperFood(superfoodDetail);

  superfood.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New Super Food: ${superfood}`);
    superfoods.push(superfood); // add to superfoods array
    cb(null, superfood);
  });
}

function createSuperFood(cb) {
  async.series(
    [
      function (callback) {
        superfoodCreate(
          'Avocado',
          'Loaded with fibre good source of lutein, an antioxidant linked to eye and skin health',
          'fiber 11 to 17 grams per fruit',
          'reduced risk of cancer, heart disease, and diabetes',
          2.0,
          callback
        );
      },

      function (callback) {
        superfoodCreate(
          'Spirulina Powder',
          'Helps build muscle mass and support immunity',
          'Energy 1420 kj, Vitamin B12',
          '',
          8.99,
          callback
        );
      },

      function (callback) {
        superfoodCreate(
          'Chlorella Powder',
          'High in protein growth and maintenance of muscle mass',
          'Energy 1450 kj, Vitamin E, B12',
          'reduction of tiredness & fatigue, protection of cells against oxidative stress',
          16.99,
          callback
        );
      },

      function (callback) {
        superfoodCreate(
          'Cocoa Nibs - Organic',
          'A source of magnesium which contributes to normal muscle function, protein synthesis and electrolyte  balance',
          'Energy 2600 kj, Magnesium\t240 mg',
          'Reduction of tiredness & fatigue, normal psychological function and normal functioning of the nervous system.',
          5.99,
          callback
        );
      },

      function (callback) {
        superfoodCreate(
          'Blueberries',
          'Loaded with antioxidants, especially anthocyanins, which have been shown to improve vision and brain function.',
          'Energy 1289 kj, Vitamin B6',
          "reduce inflammation, which is inextricably linked with virtually every chronic disease from Alzheimer's and Parkinson's, to diabetes and heart disease.",
          4.99,
          callback
        );
      },

      function (callback) {
        superfoodCreate(
          'Tumeric Superblend',
          'Contains iron & manganese to support energy and immunity',
          'Energy 1286 kj, Vitamin B6',
          'Turmeric is good for the gut as it increases gut flora (the healthy bacteria) aiding in a healthy digestive system',
          13.99,
          callback
        );
      }
    ],
    // optional callback
    cb
  );
}

async.series(
  [createSuperFood],
  // Optional callback
  (err, results) => {
    if (err) {
      console.log(`FINAL ERR: ${err}`);
    } else {
      console.log(`Super Foods: ${superfoods}`);
    }
    // All done, disconnect from database
    // mongoose.connection.close();
  }
);
