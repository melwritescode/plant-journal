require('dotenv').config();
require('./models/db');
require('./helpers/initRedis');
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const routes = require('./routes');
const { handleError } = require('./helpers/error');
const morgan = require('morgan');
const { verifyAccessToken } = require('./helpers/jwtHelper');

app.use(morgan('dev'));

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.use('/auth', routes.auth);
app.use('/api/plants', routes.plant);
app.use('/api/journal', routes.journalEntry);
app.use('/', verifyAccessToken, async (req, res, next) => {
  res.send('Hello from express');
});

app.use((err, req, res, next) => {
  handleError(err, res);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Plant Journal is listening on port ${PORT}`);
});
