const router = require('express').Router();
const JournalEntry = require('../../models/journalEntry');

const createEntry = (req, res) => {
  const newEntry = req.body;
  JournalEntry(newEntry).save((err, entry) => {
    res.json(entry);
  });
};

const getOneEntry = (req, res) => {
  JournalEntry.findOne({_id: req.params.id})
  .populate('plant')
  .then(entry => {
    res.json(entry);
  });
};

router.route('/')
  .post(createEntry)

router.route('/:id')
  .get(getOneEntry)

module.exports = router;