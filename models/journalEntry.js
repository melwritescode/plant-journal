const mongoose = require('mongoose');

// Create a schema
const journalEntrySchema = new mongoose.Schema({
  title: String,
  content: {
    type: String,
    required: true
  },
  plant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'plant',
    required: true
  }
}, {
  timestamps: true
});

// Create a model
const JournalEntry = mongoose.model('journalentry', journalEntrySchema);

// Export model
module.exports = JournalEntry;