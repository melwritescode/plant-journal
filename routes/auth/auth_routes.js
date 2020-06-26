const router = require('express').Router();
const middleware = require('./auth_middleware');

router.route('/register').post(middleware.registerNewUser);

module.exports = router;
