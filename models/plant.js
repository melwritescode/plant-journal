const mongoose = require('mongoose');

// Create a schema
const plantSchema = new mongoose.Schema(
  {
    genus: {
      type: String,
      required: true,
    },
    species: String,
    family: String,
    commonName: {
      type: String,
      required: true,
    },
    nativeTo: String,
  },
  {
    timestamps: true,
  }
);

// Create a model
const Plant = mongoose.model('plant', plantSchema);

// Export model
module.exports = Plant;
