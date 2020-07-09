const router = require('express').Router();
const controller = require('../controllers/authController');

router.route('/register').post(controller.registerNewUser);
router.route('/login').post(controller.login);
router.route('/refresh-token').post(controller.refreshToken);
router.route('/logout').delete(controller.logout);

module.exports = router;
