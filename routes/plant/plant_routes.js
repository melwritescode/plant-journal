const router = require('express').Router();
const middleware = require('./plant_middleware');
const { verifyAccessToken } = require('../../helpers/jwtHelper');

router
  .route('/')
  .post(verifyAccessToken, middleware.createPlant)
  .get(verifyAccessToken, middleware.getAllPlants);

router
  .route('/:id')
  .get(verifyAccessToken, middleware.getOnePlant)
  .patch(verifyAccessToken, middleware.updatePlant)
  .delete(verifyAccessToken, middleware.deletePlant);

module.exports = router;
