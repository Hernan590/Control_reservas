const reservaModel = require('../models/reservasModel');


function getAllReservas(req, res) {
    const idSimulador = req.query.simulador;
    const mes = req.query.mes;
    const year = req.query.year;
    const dia = req.query.dia;
    reservaModel.obtenerReservas(idSimulador, mes, year, dia, (error, reservas) => {
        if (error) {
            console.error('Error al obtener las reservas:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            res.status(200).json(reservas);
        }
    });
}

function getInformeSimuladores(req, res) {
    const simulador = req.query.simulador;
    const year_informe = req.query.year_informe
    const mes_informe = req.query.mes_informe
    reservaModel.informeSimuladores(simulador, year_informe, mes_informe, (error, stats) => {
        if (error) {
            console.error('Error al obtener estadísticas de simuladores:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            res.status(200).json(stats);
        }
    });
}

module.exports = { 
    getAllReservas,
    getInformeSimuladores,
};
