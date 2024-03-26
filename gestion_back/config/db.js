// Importa el paquete mysql
const mysql = require('mysql');

// Configura los parámetros de conexión
const connection = mysql.createConnection({
  host: 'localhost', // El host de tu base de datos MySQL
  user: 'root', // El nombre de usuario de tu base de datos MySQL
  password: '', // La contraseña de tu base de datos MySQL
  database: 'developer_gestion' // El nombre de tu base de datos MySQL
});

// Conecta a la base de datos
connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
  } else {
    console.log('Conexión exitosa a la base de datos MySQL');
  }
});

// Exporta la conexión para que pueda ser utilizada en otros archivos
module.exports = connection;
