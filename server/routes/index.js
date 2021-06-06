const Router = require('express').Router;
const router = Router();

router.use('/user', require('./user.route'));
router.use('/basket', require('./basket.route'));
router.use('/brand', require('./brand.route'));
router.use('/type', require('./type.route'));
router.use('/device', require('./device.route'));


module.exports = router;