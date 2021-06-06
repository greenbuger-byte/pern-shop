const Router = require('express').Router;
const router = Router();
const brandController = require('../controllers/brand.controller');
const checkRole = require('../Middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), brandController.create);
router.get('/', brandController.getAll);

module.exports = router;