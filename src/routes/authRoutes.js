const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Registro de usuário
router.post('/register', authController.register);

// Login do usuário
router.post('/login', authController.login);

module.exports = router;
