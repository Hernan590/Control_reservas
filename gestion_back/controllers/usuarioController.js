// controllers/usuarioController.js
const Usuario = require('../models/usuarioModel');

function login(req, res) {
  const { usuario, password } = req.body;

  Usuario.validarUsuario(usuario, password, (error, results) => {
    if (error) {
      console.error('Error al buscar usuario:', error);
      res.status(500).send('Error al buscar usuario');
    } else {
      if (results.length > 0) {
        const { rol, id } = results[0];
        res.status(200).send({ rol, id });
      } else {
        res.status(401).send('Credenciales incorrectas');
      }
    }
  });
}

module.exports = {
  login
};
