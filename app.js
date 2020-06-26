require('dotenv').config();
require('./models/db');
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const routes = require('./routes');
const { handleError } = require('./helpers/error');
const morgan = require('morgan');

app.use(morgan('dev'));

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.use('/auth', routes.auth);
app.use('/api/plants', routes.plant);
app.use('/api/journal', routes.journalEntry);

app.use((err, req, res, next) => {
  handleError(err, res);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Plant Journal is listening on port ${PORT}`);
});
