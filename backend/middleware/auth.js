const jwt = require("jsonwebtoken");
const moment = require("moment");  // Asegúrate de tener moment instalado
const SECRET_KEY = "SECRET_KEY";  // Puedes cambiar esto por una clave más segura

// Middleware de autenticación
function ensureAuth(req, res, next) {
  // Verifica si el token está presente en los headers
  if (!req.headers.authorization) {
    return res.status(403).send({ msg: "You're not authenticated." });
  }

  // Extrae el token de los headers
  const token = req.headers.authorization.split(" ")[1]; // Se asume que es un Bearer token

  try {
    // Verifica el token usando jwt.verify
    const payload = jwt.verify(token, SECRET_KEY);

    // Verifica si el token ha expirado
    if (payload.exp <= moment().unix()) {
      return res.status(400).send({ msg: "Expired token" });
    }

    // Adjunta el usuario al request para poder acceder a él en las rutas siguientes
    req.user = payload;

  } catch (error) {
    // Si el token no es válido o hay un error en la verificación
    console.error(error);
    return res.status(400).send({ msg: "Invalid token" });
  }

  // Continúa con el siguiente middleware o la ruta
  next();
}

module.exports = { ensureAuth };
