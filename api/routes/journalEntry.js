const router = require('express').Router();
const JournalEntry = require('../../models/journalEntry');

const createEntry = async (req, res, next) => {
  try {
    const newEntry = req.body;
    const entry = await JournalEntry(newEntry).save();
    res.json(entry);
    return entry;
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

const getAllEntries = async (req, res, next) => {
  try {
    const entries = await JournalEntry.find({}).populate('plant').exec();
    res.json(entries);
    return entries;
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

const getOneEntry = async (req, res, next) => {
  try {
    const entry = await JournalEntry.findOne({ _id: req.params.id })
      .populate('plant')
      .exec();
    res.json(entry);
    return entry;
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

router.route('/').post(createEntry).get(getAllEntries);

router.route('/:id').get(getOneEntry);

module.exports = router;
