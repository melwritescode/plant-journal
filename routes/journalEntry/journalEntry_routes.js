const router = require('express').Router();
const middleware = require('./journalEntry_middleware');
const { verifyAccessToken } = require('../../helpers/jwtHelper');

// /api/journal/
router
  .route('/plant')
  .get(verifyAccessToken, middleware.getAllEntriesForOnePlant);

router
  .route('/')
  .post(verifyAccessToken, middleware.createEntry)
  .get(verifyAccessToken, middleware.getAllEntries);

router
  .route('/:id')
  .get(verifyAccessToken, middleware.getOneEntry)
  .patch(verifyAccessToken, middleware.updateEntry)
  .delete(verifyAccessToken, middleware.deleteEntry);

module.exports = router;
