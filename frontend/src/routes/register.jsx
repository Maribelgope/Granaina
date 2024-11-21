import { useState } from "react";
import Header from "../COMPONENTES/header";
import Footer from "../COMPONENTES/footer";
import { useSignup } from "../hooks/useSignup";
import { Link, useNavigate } from "react-router-dom"; 

function Register() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordScore, setPasswordScore] = useState(0);
  const [emailError, setEmailError] = useState(""); 
  const [usernameError, setUsernameError] = useState(""); 
  const [nameError, setNameError] = useState(""); 
  const [passwordError, setPasswordError] = useState(""); 
  const [formError, setFormError] = useState(""); 
  const [successMessage, setSuccessMessage] = useState(""); 
  
  const samePassword = password === repeatPassword;
  const { signup, error, isLoading } = useSignup("");
  const navigate = useNavigate();

  // Función común para verificar si el nombre de usuario o correo electrónico ya existen
  const checkIfExists = async () => {
    const errors = {};
    // Verificar nombre de usuario
    const usernameResponse = await fetch("http://localhost:5000/api/check-username", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),  // Enviamos el valor del nombre de usuario
    });

    const usernameData = await usernameResponse.json();
    if (usernameData.exists) {
      errors.usernameError = "Este nombre de usuario ya está registrado.";
    }

    // Verificar correo electrónico
    const emailResponse = await fetch("http://localhost:5000/api/check-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),  // Enviamos el valor del correo electrónico
    });

    const emailData = await emailResponse.json();
    if (emailData.exists) {
      errors.emailError = "Este correo electrónico ya está registrado.";
    }

    return errors;
  };

  // Maneja el cambio en los campos del formulario
  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  // Limpiar los errores al modificar los campos
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameError("");  // Limpiar error de usuario
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");  // Limpiar error de correo
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica que todos los campos estén completos
    if (username === "" || name === "" || email === "" || password === "" || repeatPassword === "") {
      setFormError("Por favor, completa todos los campos.");
      return;
    }

    // Verifica que las contraseñas coincidan
    if (password !== repeatPassword) {
      setFormError("Las contraseñas no coinciden.");
      return;
    }

    // Verifica si el nombre de usuario o el correo electrónico ya existen
    const errors = await checkIfExists();
    if (errors.usernameError || errors.emailError) {
      setUsernameError(errors.usernameError || "");
      setEmailError(errors.emailError || "");
      return;  // Detiene la ejecución si hay algún error
    }

    // Si todo está correcto, realiza el registro
    const result = await signup(email, password, username, name);
    if (result) {
      setSuccessMessage("¡Te has registrado con éxito!");  // Mensaje de éxito
    }

    // Limpiar formulario si el registro fue exitoso
    setUsername("");
    setName("");
    setEmail("");
    setPassword("");
    setRepeatPassword("");
    setFormError("");
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
  };

  const handleContinue = () => {
    navigate("/");  // Redirige a la página principal
  };

  return (
    <div className="App">
      <Header />
      <div className="flex justify-center items-center p-6">
        <div className="w-96 rounded-lg text-center shadow-lg p-4">
          <h2 className="text-3xl font-bold mb-4">Crear una cuenta</h2>
          
          {/* Si hay un mensaje de éxito */}
          {successMessage ? (
            <div className="text-green-500 text-lg mt-4">
              {successMessage}
              <button
                onClick={handleContinue}
                className="bg-blue-500 text-white py-3 px-4 rounded-full mt-4"
              >
                Ir a la página principal
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
              {/* Error message for form submission */}
              {formError && (
                <div className="text-red-500 text-sm mt-1">{formError}</div>
              )}

              <label htmlFor="name"><b>Nombre</b></label>
              <input
                className="appearance-none block w-full text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Nombre"
                name="name"
                value={name}
                onChange={(e) => handleChange(e, setName)}
              />
              {nameError && (
                <div className="text-red-500 text-sm mt-1">{nameError}</div>
              )}

              <label htmlFor="username"><b>Nombre de usuario</b></label>
              <input
                className="appearance-none block w-full text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Nombre de usuario"
                name="username"
                value={username}
                onChange={handleUsernameChange}  // Cambié aquí
              />
              {usernameError && (
                <div className="text-red-500 text-sm mt-1">{usernameError}</div>
              )}

              <label htmlFor="email"><b>Correo electrónico</b></label>
              <input
                className="appearance-none block w-full text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="email"
                placeholder="Correo electrónico"
                name="email"
                value={email}
                onChange={handleEmailChange}  // Cambié aquí
              />
              {emailError && (
                <div className="text-red-500 text-sm mt-1">{emailError}</div>
              )}

              <label htmlFor="password"><b>Contraseña</b></label>
              <input
                className="appearance-none block w-full text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="password"
                placeholder="Contraseña"
                name="password"
                value={password}
                onChange={(e) => handleChange(e, setPassword)}
              />

              <label htmlFor="repeatPassword"><b>Repite la contraseña</b></label>
              <input
                className="appearance-none block w-full text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="password"
                placeholder="Repite la contraseña"
                name="repeatPassword"
                value={repeatPassword}
                onChange={(e) => handleChange(e, setRepeatPassword)}
              />

              {!samePassword && (
                <div className="text-red-500 text-sm mt-1">Las contraseñas no coinciden.</div>
              )}

              <button
                type="submit"
                className="bg-blue-500 text-white py-3 px-4 rounded-full mt-4"
                disabled={isLoading}
              >
                {isLoading ? "Registrando..." : "Registrarse"}
              </button>
            </form>
          )}
          <p className="mt-4">
            ¿Ya tienes cuenta? <Link to="/login" className="text-blue-500">Inicia sesión</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
