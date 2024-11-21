// Importar dependencias
const express = require('express');
const app = express();
const cors = require('cors'); // Se importa la librería CORS
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Para cifrar contraseñas
const User = require('./model/user.model'); // Asegúrate de que la ruta a tu modelo sea correcta

// Configuración del servidor
app.use(express.json()); // Para parsear el cuerpo de las solicitudes

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:5173', // Permite solicitudes solo desde el frontend en el puerto 5173
  methods: ['GET', 'POST'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
}));

// Conectar a la base de datos
mongoose.connect('mongodb://localhost:27017/LA-GRANAINA', )
  .then(() => console.log('Conexión a la base de datos exitosa'))
  .catch((error) => console.log('Error al conectar con la base de datos:', error));

// Ruta para verificar si el correo ya está registrado
app.post('/api/check-email', async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ error: 'El email es necesario' });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch (error) {
    console.error("Error al verificar el correo:", error);
    return res.status(500).json({ message: "Error al verificar el correo." });
  }
});

// Ruta para verificar si el nombre de usuario ya está registrado
app.post('/api/check-username', async (req, res) => {
  const { username } = req.body;

  try {
    if (!username) {
      return res.status(400).json({ error: 'El nombre de usuario es necesario' });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch (error) {
    console.error("Error al verificar el nombre de usuario:", error);
    return res.status(500).json({ message: "Error al verificar el nombre de usuario." });
  }
});

// Ruta para registrar un usuario
app.post('/api/users/signup', async (req, res) => {
  const { email, password, username, name } = req.body;

  try {
    // Verificar si el correo ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado.' });
    }

    // Verificar si el nombre de usuario ya existe
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'El nombre de usuario ya está registrado.' });
    }

    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = new User({ email, password: hashedPassword, username, name });
    await newUser.save();

    return res.status(201).json({ message: 'Usuario creado con éxito' });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    return res.status(500).json({ message: "Error al registrar el usuario." });
  }
});

// Ruta básica para comprobar si el servidor está en funcionamiento
app.get('/', (req, res) => {
  res.send('Servidor en funcionamiento');
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
// Ruta para hacer login de un usuario
app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body; // Obtenemos los datos del login

  try {
    // Verificar que se haya proporcionado un correo y una contraseña
    if (!email || !password) {
      return res.status(400).json({ message: 'El correo y la contraseña son necesarios.' });
    }

    // Buscar el usuario por el correo electrónico
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Comparar la contraseña proporcionada con la almacenada en la base de datos
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta.' });
    }

    // Si todo es correcto, devolver un mensaje de éxito (aquí se puede incluir un token JWT para la autenticación)
    return res.status(200).json({ message: 'Login exitoso', user: { email: user.email, username: user.username } });

  } catch (error) {
    console.error("Error al intentar hacer login:", error);
    return res.status(500).json({ message: 'Error al hacer login.' });
  }
});
