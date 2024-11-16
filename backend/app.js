// Importar dependencias
const express = require('express');
const app = express();
const cors = require('cors'); // Se importa la librería CORS
const mongoose = require('mongoose');
const User = require('./model/user.model'); // Asegúrate de que la ruta a tu modelo sea correcta

// Configuración del servidor
app.use(express.json()); // Para parsear el cuerpo de las solicitudes

// Configuración de CORS
// Habilita CORS para permitir solicitudes desde tu frontend
app.use(cors({
  origin: 'http://localhost:5173', // Permite solicitudes solo desde el frontend en el puerto 5173
  methods: ['GET', 'POST'], // Métodos permitidos
  allowedHeaders: ['Content-Type'], // Encabezados permitidos
}));

// Conectar a la base de datos (asegúrate de tener MongoDB corriendo o usar una URL de conexión válida)
mongoose.connect('mongodb://localhost:27017/LA-GRANAINA', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión a la base de datos exitosa'))
  .catch((error) => console.log('Error al conectar con la base de datos:', error));

// Ruta para verificar si el correo ya está registrado
app.post('/api/check-email', async (req, res) => {
  const { email } = req.body;  // Obtenemos el correo del cuerpo de la solicitud

  try {
    const user = await User.findOne({ email });  // Buscamos si el correo existe
    if (user) {
      return res.json({ exists: true });  // Si el usuario existe, devolvemos true
    } else {
      return res.json({ exists: false });  // Si no existe, devolvemos false
    }
  } catch (error) {
    console.error("Error al verificar el correo:", error);
    return res.status(500).json({ message: "Error al verificar el correo." });
  }
});

// Ruta para registrar un usuario
app.post('/api/users/signup', async (req, res) => {
  const { email, password, username, name } = req.body; // Obtenemos los datos del usuario

  try {
    // Verificar si el correo ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado.' });
    }

    // Crear el nuevo usuario
    const newUser = new User({ email, password, username, name });
    await newUser.save();

    return res.status(201).json({ message: 'Usuario creado con éxito' });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    return res.status(500).json({ message: "Error al registrar el usuario." });
  }
});

// Definir una ruta básica
app.get('/', (req, res) => {
  res.send('Servidor en funcionamiento');
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
