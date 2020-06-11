const router = require('express').Router();
const Plant = require('../../models/plant');

const createPlant = (req, res) => {
  const newPlant = req.body;
  Plant(newPlant).save((err, plant) => {
    res.json(plant);
  });
};

const getAllPlants = (req, res) => {
  Plant.find({})
  .then((plants) => {
    res.json(plants)
  });
};

router.route('/plants')
  .post(createPlant)
  .get(getAllPlants);

module.exports = router;
