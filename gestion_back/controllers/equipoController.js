// controllers/equipoController.js
const equipoModel = require('../models/equipoModel');

function obtenerEquipos(req, res) {
  equipoModel.tipoEquipos()
    .then(tiposSimuladores => {
      res.json(tiposSimuladores);
    })
    .catch(error => {
      console.error('Error al obtener tipos de simuladores en el controlador:', error);
      res.status(500).json({ message: 'Error al obtener tipos de simuladores en el controlador' });
    });
}

function agregarReserva(req, res) {
    const { nombreReserva, nombreDocente, cantidadEstudiantes, fecha, hora, simuladorSeleccionado, user } = req.body;

    const reserva = {
        nombreReserva,
        nombreDocente,
        cantidadEstudiantes,
        fecha,
        hora,
        simuladorSeleccionado,
        user
    };

    equipoModel.guardarReserva(reserva)
        .then(result => {
            res.status(200).json({ message: 'Reserva guardada exitosamente' });
        })
        .catch(error => {
            console.error('Error al guardar reserva:', error);
            res.status(500).json({ message: 'Error al guardar reserva' });
        });
}

module.exports = { 
    obtenerEquipos,
    agregarReserva 
};

