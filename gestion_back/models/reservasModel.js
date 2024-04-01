const conn = require('../config/db');


function obtenerReservas(idSimulador, mes, year, dia, callback) {
  let query = 'SELECT cr.id as id, \
                          cr.nombre_reserva as nombre_reserva, \
                          cr.nombre_docente as nombre_docente, \
                          cr.estudiantes as estudiantes, \
                          cr.equipo_simulador as equipo_simulador, \
                          cre.nombre_equipo as nombre_equipo, \
                          DATE_FORMAT(cr.fecha_reserva, \'%Y-%m-%d\') as fecha_reserva, \
                          cr.hora_reserva as hora_reserva, \
                          usu.nombre_usuario as nombre_usuario, \
                          cr.usuario as usuario, \
                          cr.estado as estado \
                    FROM control_reservas as cr \
                    INNER JOIN control_reservas_equipos as cre ON cre.id = cr.equipo_simulador \
                    INNER JOIN usuarios as usu ON usu.id = cr.usuario \
                    WHERE cr.estado = 1';

  const queryParams = [];

  if (idSimulador !== '0') {
    query += ' AND cr.equipo_simulador = ?';
    queryParams.push(idSimulador);
  }

  if (year !== '0') {
    query += ' AND YEAR(cr.fecha_reserva) = ?';
    queryParams.push(year);
  }

  if (mes !== '0') {
    query += ' AND MONTH(cr.fecha_reserva) = ?';
    queryParams.push(mes);
  }

  if (dia !== '0') {
    query += ' AND DAY(cr.fecha_reserva) = ?'
    queryParams.push(dia);
  }

  conn.query(query, queryParams, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function informeSimuladores(simulador, year_informe, mes_informe, callback) {
  let query = `SELECT cre.nombre_equipo AS nombre_equipo,
                        COUNT(cr.equipo_simulador) AS cantidad_usos
                 FROM control_reservas cr
                 INNER JOIN control_reservas_equipos AS cre ON cre.id = cr.equipo_simulador
                 WHERE cr.estado = 1`;

  const queryParams = [];

  if (simulador !== '0') {
    query += ' AND cr.equipo_simulador = ?';
    queryParams.push(simulador);
  }

  if (year_informe !== '0') {
    query += ' AND YEAR(cr.fecha_reserva) = ?';
    queryParams.push(year_informe);
  }

  if (mes_informe !== '0') {
    query += ' AND MONTH(cr.fecha_reserva) = ?';
    queryParams.push(mes_informe);
  }

  query += ` GROUP BY cr.equipo_simulador
            UNION ALL
            SELECT 'Total' AS nombre_equipo, COUNT(cr.equipo_simulador) AS cantidad_usos
            FROM control_reservas cr
            WHERE cr.estado = 1`;

  if (simulador !== '0') {
    query += ' AND cr.equipo_simulador = ?';
    queryParams.push(simulador);
  }

  if (year_informe !== '0') {
    query += ' AND YEAR(cr.fecha_reserva) = ?';
    queryParams.push(year_informe);
  }

  if (mes_informe !== '0') {
    query += ' AND MONTH(cr.fecha_reserva) = ?';
    queryParams.push(mes_informe);
  }
  
  let query2 = `SELECT COUNT(*) AS total_registros FROM control_reservas AS cr WHERE cr.estado = 1`;

  if (simulador !== '0') {
    query2 += ' AND cr.equipo_simulador = ?';
    queryParams.push(simulador);
  }

  if (year_informe !== '0') {
    query2 += ' AND YEAR(cr.fecha_reserva) = ?';
    queryParams.push(year_informe);
  }

  if (mes_informe !== '0') {
    query2 += ' AND MONTH(cr.fecha_reserva) = ?';
    queryParams.push(mes_informe);
  }
  
  conn.query(query, queryParams, (error, results1) => {
    if (error) {
        callback(error, null);
    } else {
        conn.query(query2, queryParams, (error, results2) => {
          if (error) {
              callback(error, null);
          } else {
              const combinedResults = { results1, results2 };
              callback(null, combinedResults);
          }
        });
    }
  });
}
  
  module.exports = {
    obtenerReservas,
    informeSimuladores
  };