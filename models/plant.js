const mongoose = require('mongoose');

// Create a schema
const plantSchema = new mongoose.Schema({
    commonName: String,
    botanicalName: String
});
  

// Create a model
const Plant = mongoose.model('plant', plantSchema);

// Export model
module.exports = Plant;