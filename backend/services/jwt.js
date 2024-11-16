const jwt = require("jsonwebtoken");

const SECRET_KEY = "SECRET_KEY";

function createToken(userInfo, expiresIn) {
  const { id, email } = userInfo;
  const payload = { id, email };

  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function decodeToken(token) {
  return jwt.decode(token, SECRET_KEY);
}

module.exports = {
  createToken,
  decodeToken,
};
