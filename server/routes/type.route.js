const Router = require('express').Router;
const router = Router();
const typeController = require('../controllers/type.controller');
const checkRole = require('../Middleware/checkRoleMiddleware');

router.post('/',checkRole('ADMIN'), typeController.create);
router.get('/', typeController.getAll);

module.exports = router;