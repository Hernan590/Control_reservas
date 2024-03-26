// Importa Express y CORS
const express = require('express');
const cors = require('cors');
const app = express();

const usuarioRoutes = require('./routes/usuarioRoute');
const tipoEquipo = require('./routes/equipoRoute');

app.use(express.json());
app.use(cors());

app.use('/usuario', usuarioRoutes);
app.use('/equipos', tipoEquipo)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
});
