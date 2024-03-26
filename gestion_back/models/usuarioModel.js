const conn = require('../config/db');

function validarUsuario(usuario, password, callback) {
  const query = 'SELECT nombre_usuario, rol, id FROM usuarios WHERE nombre_usuario = ? AND password = ?';
  conn.query(query, [usuario, password], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

module.exports = {
  validarUsuario
};

