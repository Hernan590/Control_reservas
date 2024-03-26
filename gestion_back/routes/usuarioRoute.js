// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Ruta para manejar la solicitud de inicio de sesión
router.post('/login', usuarioController.login);

module.exports = router;
