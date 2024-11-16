const express = require("express");
const User = require("../model/user.model"); 
const jwt = require("../services/jwt");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password, name } = req.body;

  if (!username || !email || !password || !name) {
    return res.status(400).json({ msg: "Todos los campos son obligatorios." });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "El correo ya está registrado." });
    }

    const newUser = new User({
      username,
      email,
      password,  
      name
    });

    await newUser.save();

    const token = jwt.createToken({ id: newUser._id, email: newUser.email }, "1d");

    return res.status(201).json({ msg: "Usuario registrado", token });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    return res.status(500).json({ msg: "Error al registrar el usuario" });
  }
});

module.exports = router;
