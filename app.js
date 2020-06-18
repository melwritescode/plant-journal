const express = require('express');
const app = express();
const bodyparser = require('body-parser');

const db = require('./models/db');
const routes = require('./api/routes');
const { handleError } = require('./helpers/error');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.use('/api/plants', routes.plant);
app.use('/api/journal', routes.journalEntry);

app.use((err, req, res, next) => {
  console.log(`ERROR: ${err}`);
  handleError(err, res);
});

app.listen(3000);
console.log('Plant Journal is listening on port 3000');
