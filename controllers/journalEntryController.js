const JournalEntry = require('../Models/journalEntry');
const Plant = require('../models/plant');
const createError = require('http-errors');

// GET /api/journal/
const getAllEntries = async (req, res, next) => {
  try {
    const entries = await JournalEntry.find({ user: req.payload.aud })
      .orFail(createError.NotFound('No journal entries were found.'))
      .populate('plant')
      .exec();
    res.json(entries);
    return entries;
  } catch (err) {
    next(err);
  }
};

// GET /api/journal/plant/?id=
const getAllEntriesForOnePlant = async (req, res, next) => {
  try {
    const filter = {
      user: req.payload.aud,
      plant: req.query.id,
    };
    const entries = await JournalEntry.find(filter)
      .orFail(
        createError.NotFound('There are no journal entries for this plant.')
      )
      .exec();
    res.json(entries);
    return entries;
  } catch (err) {
    next(err);
  }
};

// GET /api/journal/:id
const getOneEntry = async (req, res, next) => {
  try {
    const filter = {
      _id: req.params.id,
      user: req.payload.aud,
    };
    const entry = await JournalEntry.findOne(filter)
      .orFail(createError.NotFound('No journal entries were found.'))
      .populate('plant')
      .exec();
    res.json(entry);
    return entry;
  } catch (err) {
    next(err);
  }
};

// POST /api/journal/
const createEntry = async (req, res, next) => {
  try {
    const filter = {
      _id: req.body.plant,
      user: req.payload.aud,
    };
    const userHasPlant = await Plant.exists(filter);

    if (!userHasPlant) throw createError.Unauthorized();

    const payload = {
      ...req.body,
      user: req.payload.aud,
    };

    const entry = await JournalEntry(payload).save();
    res.json(entry);
    return entry;
  } catch (err) {
    next(err);
  }
};

// PATCH /api/journal/:id
const updateEntry = async (req, res, next) => {
  try {
    const filter = {
      _id: req.params.id,
      user: req.payload.aud,
    };
    const entry = await JournalEntry.findOneAndUpdate(filter, req.body, {
      runValidators: true,
      new: true,
    })
      .orFail()
      .exec();
    res.json(entry);
    return;
  } catch (err) {
    next(err);
  }
};

// DELETE /api/journal/:id
const deleteEntry = async (req, res, next) => {
  try {
    const filter = {
      _id: req.params.id,
      user: req.payload.aud,
    };

    await JournalEntry.findOneAndDelete(filter)
      .orFail(
        createError.NotFound(
          'The journal entry you are trying to delete was not found.'
        )
      )
      .exec();

    res.send('This journal entry has been successfully deleted.');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createEntry,
  getAllEntries,
  getAllEntriesForOnePlant,
  getOneEntry,
  updateEntry,
  deleteEntry,
};
