const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const routes = require('./api/routes');
const db = require('./models/db');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json())

app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.use('/api/plants', routes.plant);
app.use('/api/journal', routes.journalEntry);

app.listen(3000);
console.log('Plant Journal is listening on port 3000');