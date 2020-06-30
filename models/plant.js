const mongoose = require('mongoose');

// Create a schema
const plantSchema = new mongoose.Schema(
  {
    genus: {
      type: String,
      required: [true, 'Genus is required.'],
    },
    species: String,
    family: String,
    commonName: {
      type: String,
      required: [true, 'Common name is required.'],
    },
    nativeTo: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Please log in or register.'],
    },
  },
  {
    timestamps: true,
  }
);

// Create a model
const Plant = mongoose.model('plant', plantSchema);

// Export model
module.exports = Plant;
