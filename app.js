const express = require('express');
const app = express();
const bodyparser = require('body-parser');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

require('./models/db');
const routes = require('./routes');
const { handleError } = require('./helpers/error');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.use('/api/plants', routes.plant);
app.use('/api/journal', routes.journalEntry);

app.use((err, req, res, next) => {
  handleError(err, res);
});

app.listen(PORT, () => {
  console.log(`Plant Journal is listening on port ${PORT}`);
});
