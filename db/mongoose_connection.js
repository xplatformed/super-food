const mongoose = require('mongoose');

const mongoDB = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/superfoods';

mongoose.Promise = global.Promise;

mongoose.connect(mongoDB, { useNewUrlParser: true, useCreateIndex: true });

mongoose.set('useFindAndModify', false);

module.exports = { mongoose };

// NOTE! https://github.com/Automattic/mongoose/issues/6890 ... https://mongoosejs.com/docs/deprecations.html
// To avoid depreciation warnings
// useNewUrlParser: true
// useCreateIndex: true

// DeprecationWarning: Mongoose: `findOneAndUpdate()` and `
// findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated.
