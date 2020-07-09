const router = require('express').Router();
const controller = require('../controllers/plantController');
const { verifyAccessToken } = require('../helpers/jwtHelper');

router
  .route('/')
  .post(verifyAccessToken, controller.createPlant)
  .get(verifyAccessToken, controller.getAllPlants);

router
  .route('/:id')
  .get(verifyAccessToken, controller.getOnePlant)
  .patch(verifyAccessToken, controller.updatePlant)
  .delete(verifyAccessToken, controller.deletePlant);

module.exports = router;
