const router = require('express').Router();
const middleware = require('./plant_middleware');

router.route('/').post(middleware.createPlant).get(middleware.getAllPlants);
router.route('/:id').get(middleware.getOnePlant).patch(middleware.updatePlant);

module.exports = router;
