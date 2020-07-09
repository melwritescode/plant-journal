const Plant = require('../models/plant');
const createError = require('http-errors');

// GET /api/plants
const getAllPlants = async (req, res, next) => {
  try {
    const plants = await Plant.find({ user: req.payload.aud })
      .orFail(createError.NotFound('There are no plants in this garden, yet.'))
      .exec();
    res.json(plants);
    return plants;
  } catch (err) {
    next(err);
  }
};

// GET /api/plants/:id
const getOnePlant = async (req, res, next) => {
  try {
    const filter = {
      _id: req.params.id,
      user: req.payload.aud,
    };
    const plant = await Plant.findOne(filter)
      .orFail(createError.UnprocessableEntity('Invalid plant ID.'))
      .exec();
    res.json(plant);
    return plant;
  } catch (err) {
    next(err);
  }
};

// POST /api/plants
const createPlant = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      user: req.payload.aud,
    };
    const plant = await Plant(payload).save();
    res.json(plant);
    return plant;
  } catch (err) {
    next(err);
  }
};

// PATCH /api/plants/:id
const updatePlant = async (req, res, next) => {
  try {
    const filter = {
      _id: req.params.id,
      user: req.payload.aud,
    };
    const updatedPlant = await Plant.findOneAndUpdate(filter, req.body, {
      runValidators: true,
      new: true,
    })
      .orFail(createError.UnprocessableEntity('Unable to update plant data.'))
      .exec();
    res.json(updatedPlant);
    return;
  } catch (err) {
    next(err);
  }
};

// DELETE /api/plants/:id
const deletePlant = async (req, res, next) => {
  try {
    const filter = {
      _id: req.params.id,
      user: req.payload.aud,
    };
    await Plant.findOneAndDelete(filter)
      .orFail(
        createError.NotFound(
          'The plant you are trying to delete was not found.'
        )
      )
      .exec();
    res.send('This plant was successfully deleted.');
    return;
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllPlants,
  getOnePlant,
  createPlant,
  updatePlant,
  deletePlant,
};
