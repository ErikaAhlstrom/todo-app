const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.get('/current', auth, userController.getCurrentUser);
router.post('/login', userController.loginUser);
router.get('/logout', userController.logoutUser);
router.get('/loggedIn', userController.checkIfLoggedIn);

module.exports = router;
