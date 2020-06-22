const mongoose = require('mongoose');

// Create a schema
const journalEntrySchema = new mongoose.Schema(
  {
    title: String,
    content: {
      type: String,
      required: [true, 'Content is required.'],
    },
    plant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'plant',
      required: [true, 'A plant must be provided to create a journal entry.'],
    },
  },
  {
    timestamps: true,
  }
);

// Create a model
const JournalEntry = mongoose.model('journalentry', journalEntrySchema);

// Export model
module.exports = JournalEntry;
