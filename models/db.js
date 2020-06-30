const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.DB_NAME,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connection has been made.');
})
  .on('error', (err) => {
    console.log('Connection error:', err.message);
  })
  .on('disconnected', () => {
    console.log('Mongoose is disconnected from MongoDB.');
  });

// Close Mongoose connection when server stops running
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});
