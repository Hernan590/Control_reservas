const express = require('express');
const router = express.Router();
const reservasController = require('../controllers/reservasController');

router.get('/verReservas', reservasController.getAllReservas);
router.get('/verInforme', reservasController.getInformeSimuladores)

module.exports = router;