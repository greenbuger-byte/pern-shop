const Router = require('express').Router;
const router = Router();
const deviceController = require('../controllers/device.controller');
const checkRole = require('../Middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), deviceController.create);
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getOne);


module.exports = router;