const router = require('express').Router();
const Plant = require('../../models/plant');

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

const getAllPlants = async (req, res, next) => {
  try {
    const plants = await Plant.find({})
      .orFail(new Error('There are no plants in this garden, yet.'))
      .exec();
    res.json(plants);
    return plants;
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

router.route('/').post(createPlant).get(getAllPlants);

module.exports = router;
