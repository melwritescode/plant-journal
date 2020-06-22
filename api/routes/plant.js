const mongoose = require('mongoose');
const router = require('express').Router();
const Plant = require('../../models/plant');
const { ErrorHandler } = require('../../helpers/error');

// GET /api/plants
const getAllPlants = async (req, res, next) => {
  try {
    const plants = await Plant.find({})
      .orFail(new ErrorHandler(404, 'There are no plants in this garden, yet.'))
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
    const plant = await Plant.findById(req.params.id)
      .orFail(new ErrorHandler(422, 'Invalid plant ID'))
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
    const newPlant = req.body;
    const plant = await Plant(newPlant).save();
    res.json(plant);
    return plant;
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

// PATCH /api/plants/:id
const updatePlant = async (req, res, next) => {
  try {
    const updatedPlant = await Plant.updateOne(
      { _id: req.params.id },
      req.body,
      { runValidators: true }
    )
      .orFail(new ErrorHandler(422, 'Unable to update plant data.'))
      .exec();
    res.send('Your plant was successfully updated.');
    return;
  } catch (err) {
    next(err);
  }
};

router.route('/').post(createPlant).get(getAllPlants);
router.route('/:id').get(getOnePlant).patch(updatePlant);

module.exports = router;
