const router = require('express').Router();
const controller = require('../controllers/journalEntryController');
const { verifyAccessToken } = require('../helpers/jwtHelper');

// /api/journal/
router
  .route('/plant')
  .get(verifyAccessToken, controller.getAllEntriesForOnePlant);

router
  .route('/')
  .post(verifyAccessToken, controller.createEntry)
  .get(verifyAccessToken, controller.getAllEntries);

router
  .route('/:id')
  .get(verifyAccessToken, controller.getOneEntry)
  .patch(verifyAccessToken, controller.updateEntry)
  .delete(verifyAccessToken, controller.deleteEntry);

module.exports = router;
