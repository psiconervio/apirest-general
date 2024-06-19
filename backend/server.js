const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/tu_base_de_datos', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Definir el esquema y el modelo de los datos
const DataSchema = new mongoose.Schema({
  sensor: String,
  value: Number,
  timestamp: { type: Date, default: Date.now }
});

const Data = mongoose.model('Data', DataSchema);

// Crear la ruta para recibir datos
app.post('/api/data', async (req, res) => {
  const { sensor, value } = req.body;
  const data = new Data({ sensor, value });
  await data.save();
  res.json({ status: 'success', data });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
