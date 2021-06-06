const Router = require('express').Router;
const router = Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../Middleware/auth.middleware');


router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);

module.exports = router;