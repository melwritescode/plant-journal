const router = require('express').Router();
const middleware = require('./auth_middleware');

router.route('/register').post(middleware.registerNewUser);
router.route('/login').post(middleware.login);
router.route('/refresh-token').post(middleware.refreshToken);

module.exports = router;
