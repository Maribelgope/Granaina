/* Este es el archivo que recibe del login de la cabecera el correo y el password para comprobar si está */

const express = require("express");

const { ensureAuth } = require("../middleware/auth");

const router = express.Router(); // Se agrega aquí

const userController = require("../controller/user.controller");

router.get("/", [ensureAuth], userController.get);

router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.patch("/changePassword", [ensureAuth], userController.changePassword);

router.patch("/changeEmail", [ensureAuth], userController.changeEmail);

router.get("/getCart", [ensureAuth], userController.getCart);

router.patch("/updateCart", [ensureAuth], userController.updateCart);

router.patch("/", [ensureAuth], userController.patch);

router.delete("/", [ensureAuth], userController.destroy);

module.exports = router;
