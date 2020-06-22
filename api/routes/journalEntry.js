const router = require('express').Router();
const JournalEntry = require('../../models/journalEntry');
const { ErrorHandler } = require('../../helpers/error');

const createEntry = async (req, res, next) => {
  try {
    const newEntry = req.body;
    const entry = await JournalEntry(newEntry).save();
    res.json(entry);
    return entry;
  } catch (err) {
    next(err);
  }
};

const getAllEntries = async (req, res, next) => {
  try {
    const entries = await JournalEntry.find({})
      .orFail(new ErrorHandler(404, 'No journal entries were found.'))
      .populate('plant')
      .exec();
    res.json(entries);
    return entries;
  } catch (err) {
    next(err);
  }
};

const getAllEntriesForOnePlant = async (req, res, next) => {
  try {
    const entries = await JournalEntry.find({ plant: req.body.plantId })
      .orFail(
        new ErrorHandler(404, 'There are no journal entries for this plant.')
      )
      .exec();
    res.json(entries);
    return entries;
  } catch (err) {
    next(err);
  }
};

const getOneEntry = async (req, res, next) => {
  try {
    const entry = await JournalEntry.findOne({ _id: req.params.id })
      .orFail(new ErrorHandler(404, 'No journal entries were found.'))
      .populate('plant')
      .exec();
    res.json(entry);
    return entry;
  } catch (err) {
    next(err);
  }
};

router.route('/plant').get(getAllEntriesForOnePlant);

router.route('/').post(createEntry).get(getAllEntries);

router.route('/:id').get(getOneEntry);

module.exports = router;
