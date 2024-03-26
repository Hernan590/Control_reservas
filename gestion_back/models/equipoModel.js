const conn = require('../config/db');

function tipoEquipos() {
  return new Promise((resolve, reject) => {
    conn.query('SELECT id, nombre_equipo, estado FROM control_reservas_equipos WHERE estado = 1', (error, results) => {
      if (error) {
        console.error('Error al obtener tipos de simuladores en el modelo:', error);
        reject('Error al obtener tipos de simuladores en el modelo');
      } else {
        resolve(results);
      }
    });
  });
}

function guardarReserva(reserva) {
    return new Promise((resolve, reject) => {

        const query = 'INSERT INTO control_reservas (nombre_reserva, nombre_docente, estudiantes, equipo_simulador, fecha_reserva, hora_reserva, usuario) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [reserva.nombreReserva, reserva.nombreDocente, reserva.cantidadEstudiantes, reserva.simuladorSeleccionado, reserva.fecha, reserva.hora, reserva.user];
        conn.query(query, values, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = { 
    tipoEquipos,
    guardarReserva
 };
