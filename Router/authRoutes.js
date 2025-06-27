const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');
router.get('/all',authController.getAllUsers);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.get("/profile", protect, authController.getProfile);
router.put("/profile", protect, authController.updateProfile);
router.put("/password", protect, authController.changePassword);
router.get('/:id',authController.getUserById);

module.exports = router;
