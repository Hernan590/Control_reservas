// routes/equipoRoute.js
const express = require('express');
const router = express.Router();
const equipoController = require('../controllers/equipoController');

// Ruta para manejar la solicitud de inicio de sesión
router.get('/tipoEquipos', equipoController.obtenerEquipos);
router.post('/crearReserva', equipoController.agregarReserva)

module.exports = router;