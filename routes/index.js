const plant = require('./plant/plant_routes');
const journalEntry = require('./journalEntry/journalEntry_routes');
const auth = require('./auth/auth_routes');

module.exports = {
  plant,
  journalEntry,
  auth,
};
