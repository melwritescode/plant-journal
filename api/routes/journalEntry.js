const router = require('express').Router();
const JournalEntry = require('../../models/journalEntry');

const createEntry = (req, res, next) => {
  const newEntry = req.body;
  JournalEntry(newEntry).save((err, entry) => {
    res.json(entry);
  });
};

const getAllEntries = (req, res, next) => {
  JournalEntry.find({})
    .populate('plant')
    .then((entries) => res.json(entries));
};

const getOneEntry = (req, res, next) => {
  JournalEntry.findOne({ _id: req.params.id })
    .populate('plant')
    .then((entry) => {
      res.json(entry);
    })
    .catch((err) => {
      err.message = 'Invalid journal id.';
      err.status = 400;
      next(err);
    });
};

router.route('/').post(createEntry).get(getAllEntries);

router.route('/:id').get(getOneEntry);

module.exports = router;
