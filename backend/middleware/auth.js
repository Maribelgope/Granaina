const moment = require("moment");

const jwt = require("../services/jwt");

const SECRET_KEY = "SECRET_KEY";

function ensureAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ msg: "You're not authenticated." });
  }

  const token = req.headers.authorization.split(" ")[1];

  const payload = jwt.decodeToken(token, SECRET_KEY);
  try {
    if (payload.exp <= moment().unix()) {
      return res.status(400).send({ msg: "Expired token" });
    }

    req.user = payload;
  } catch (error) {
    console.log(error);
    return res.status(400).send({ msg: "Invalid token" });
  }
  next();
}

module.exports = { ensureAuth };
