const router = require('express').Router();
const JournalEntry = require('../../models/journalEntry');

const createEntry = (req, res) => {
  const newEntry = req.body;
  JournalEntry(newEntry).save((err, entry) => {
    res.json(entry);
  });
};

router.route('/')
  .post(createEntry)

module.exports = router;