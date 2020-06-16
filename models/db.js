const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/plant-journal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connection has been made.');
}).on('error', (err) => {
  console.log('Connection error:', err);
});
