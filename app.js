const express = require('express');
const bodyParser = require('body-parser');

const app = express();

require('./config/config');
const { mongoose } = require('./db/mongoose_connection');

const superfood = require('./routes/superFood.route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use('/', superfood);
app.use('/', superfood);
app.use('/superfoods', superfood);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});

module.exports = {
  app
};
