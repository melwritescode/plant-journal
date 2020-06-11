const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const router = require('./api/routes/plant');
const db = require('./models/db');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json())

app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.use('/api', router);

app.listen(3000);
console.log('Plant Journal is listening on port 3000');