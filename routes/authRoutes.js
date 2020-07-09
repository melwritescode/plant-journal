const router = require('express').Router();
const middleware = require('../controllers/authController');

router.route('/register').post(middleware.registerNewUser);
router.route('/login').post(middleware.login);
router.route('/refresh-token').post(middleware.refreshToken);
router.route('/logout').delete(middleware.logout);

module.exports = router;
