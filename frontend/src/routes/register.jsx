import { useState } from "react";
import Header from "../COMPONENTES/header";
import Footer from "../COMPONENTES/footer";
import { useSignup } from "../hooks/useSignup";
import { Link, useNavigate } from "react-router-dom"; 
import zxcvbn from "zxcvbn";

function Register() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordScore, setPasswordScore] = useState(0);
  const [emailError, setEmailError] = useState(""); 
  const [nameError, setNameError] = useState(""); 
  const [usernameError, setUsernameError] = useState(""); 
  const [passwordError, setPasswordError] = useState(""); 
  const [successMessage, setSuccessMessage] = useState(""); 
  const [formError, setFormError] = useState(""); 
  
  const samePassword = password === repeatPassword;
  const { signup, error, isLoading } = useSignup("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };


/* para ver que datos tiene email en cada paso */

const checkEmailExists = async (email) => {
  console.log("Comprobando si el correo existe: ", email);  // Muestra el correo que se está enviando

  try {
    const response = await fetch(`http://localhost:5000/api/check-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),  // Asegúrate de que estamos enviando el correo en el cuerpo
    });

    if (!response.ok) {
      throw new Error("Error al verificar el correo electrónico");
    }

    const data = await response.json();
    console.log("Respuesta del servidor: ", data);  // Muestra lo que devuelve el servidor
    return data.exists;  // Si existe, devuelve true; si no, false

  } catch (error) {
    console.error("Error al comprobar si el correo existe:", error);
    setEmailError("Hubo un error al verificar el correo.");
    return false;
  }
};


  // Maneja el cambio en el correo
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Valida el correo electrónico cuando se pierde el foco
  const handleEmailBlur = () => {
    if (!validateEmail(email)) {
      setEmailError("Correo electrónico inválido.");
    } else {
      setEmailError(""); // Limpiar el error si el correo es válido
    }
  };

  // Maneja el cambio en el nombre de usuario
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Valida el nombre de usuario cuando se pierde el foco del input
  const handleUsernameBlur = () => {
    if (username.length < 6) {
      setUsernameError("El nombre de usuario debe tener más de 6 caracteres.");
    } else {
      setUsernameError(""); // Limpiar el error si el nombre de usuario es válido
    }
  };

  // Maneja el cambio en el nombre
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Valida el nombre cuando se pierde el foco del input
  const handleNameBlur = () => {
    if (name.length < 6) {
      setNameError("El nombre debe tener más de 6 caracteres.");
    } else {
      setNameError(""); // Limpiar el error si el nombre es válido
    }
  };

  // Maneja el cambio en la contraseña
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordScore(zxcvbn(e.target.value).score);
  };

  // Valida la contraseña cuando se pierde el foco del input
  const handlePasswordBlur = () => {
    if (password.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres.");
    } else {
      setPasswordError(""); // Limpiar el error si la contraseña es válida
    }
  };

  // Cambiar de campo al presionar Enter
  const handleKeyPress = (e, nextField) => {
    if (e.key === "Enter") {
      nextField?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica si los campos están completos
    if (username === "" || name === "" || email === "" || password === "" || repeatPassword === "") {
      setFormError("Por favor, completa todos los campos.");
      return; // Esto previene que el formulario se envíe
    }

    // Verificar si las contraseñas coinciden
    if (password !== repeatPassword) {
      setFormError("Las contraseñas no coinciden.");
      return;
    }

    // Verificar si el correo ya existe
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      setFormError("Este correo electrónico ya está registrado.");
      return;
    }

    // Si todo está correcto, realiza el registro
    const result = await signup(email, password, username, name);
    if (result) {
      setSuccessMessage("¡Te has registrado con éxito! Redirigiendo a la página de inicio de sesión...");
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Redirige después de 2 segundos
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="flex justify-center items-center p-6">
        <div className="w-96 rounded-lg text-center shadow-lg p-4">
          <h2 className="text-3xl font-bold mb-4">Crear una cuenta</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
            
            {/* Error message for form submission */}
            {formError && (
              <div className="text-red-500 text-sm mt-1">{formError}</div>
            )}

            <label htmlFor="username"><b>Nombre de usuario</b></label>
            <input
              className="appearance-none block w-full text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Nombre de usuario"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              onBlur={handleUsernameBlur}
              onKeyDown={(e) => handleKeyPress(e, document.getElementById("name"))}
            />
            {usernameError && (
              <div className="text-red-500 text-sm mt-1">{usernameError}</div>
            )}

            <label htmlFor="name"><b>Nombre</b></label>
            <input
              className="appearance-none block w-full text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Nombre"
              name="name"
              id="name"
              value={name}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              onKeyDown={(e) => handleKeyPress(e, document.getElementById("email"))}
            />
            {nameError && (
              <div className="text-red-500 text-sm mt-1">{nameError}</div>
            )}

            <label htmlFor="email"><b>Correo electrónico</b></label>
            <input
              className="appearance-none block w-full text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="email"
              placeholder="Correo electrónico"
              name="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              onKeyDown={(e) => handleKeyPress(e, document.getElementById("password"))}
            />
            {emailError && (
              <div className="text-red-500 text-sm mt-1">{emailError}</div>
            )}

            <label htmlFor="password"><b>Contraseña</b></label>
            <div className="relative">
              <input
                className="appearance-none block w-full text-gray-700 rounded pt-3 pb-6 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="password"
                placeholder="Contraseña"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                onKeyDown={(e) => handleKeyPress(e, document.getElementById("repeatPassword"))}
              />
              {passwordError && (
                <div className="text-red-500 text-sm mt-1">{passwordError}</div>
              )}
            </div>

            <label htmlFor="repeatPassword"><b>Repite la contraseña</b></label>
            <input
              className="appearance-none block w-full text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="password"
              placeholder="Repite la contraseña"
              name="repeatPassword"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
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
          {successMessage && (
            <div className="text-green-500 text-sm mt-1">{successMessage}</div>
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

