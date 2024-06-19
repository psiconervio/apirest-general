const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// URI de conexión a MongoDB
const uri = 'mongodb+srv://augustodelcampo97:nodotecnologico123@cluster0.bqct0uc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Asegúrate de reemplazar con tu URI real

// Conectar a MongoDB
mongoose.connect(uri).then(() => {
  console.log('Conectado a MongoDB');
}).catch(err => {
  console.error(`Error de conexión: ${err}`);
});

app.use(cors());
app.use(bodyParser.json());

// Definir el esquema y el modelo de los datos
const DataSchema = new mongoose.Schema({
  sensor: String,
  value: Number,
  timestamp: { type: Date, default: Date.now }
});

const Data = mongoose.model('Data', DataSchema);

// Ruta para recibir datos
app.post('/api/data', async (req, res) => {
  const { sensor, value } = req.body;
  const data = new Data({ sensor, value });
  await data.save();
  res.json({ status: 'success', data });
});

// Ruta para obtener todos los datos
app.get('/api/data', async (req, res) => {
  const data = await Data.find();
  res.json(data);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
