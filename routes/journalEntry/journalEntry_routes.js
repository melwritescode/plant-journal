const router = require('express').Router();
const middleware = require('./journalEntry_middleware');

// /api/journal/
router.route('/plant').get(middleware.getAllEntriesForOnePlant);
router.route('/').post(middleware.createEntry).get(middleware.getAllEntries);
router.route('/:id').get(middleware.getOneEntry);

module.exports = router;
