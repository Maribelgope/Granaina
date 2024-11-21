import { useState } from "react";
import Header from "../COMPONENTES/header";
import Footer from "../COMPONENTES/footer";
import { useSignup } from "../hooks/useSignup";
import { Link, useNavigate } from "react-router-dom"; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(""); 
  const [passwordError, setPasswordError] = useState(""); 
  const [formError, setFormError] = useState(""); 
  const [successMessage, setSuccessMessage] = useState(""); 
  
  const { signup, error, isLoading } = useSignup("");
  const navigate = useNavigate();

  // Función para verificar si el correo y la contraseña existen en la base de datos
  const checkIfExists = async () => {
    const errors = {};
     
    // Verificar correo electrónico
    const emailResponse = await fetch("http://localhost:5000/api/check-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),  // Enviamos el valor del correo electrónico
    }); 

    const emailData = await emailResponse.json();

    // Mostrar en consola el correo y si existe o no
    if (emailData.exists) {
      console.log(`El correo ${email} ya está registrado.`);
    } else {
      console.log(`El correo ${email} no está registrado.`);
    }

    // Verificar si la contraseña existe en la base de datos
    const passwordResponse = await fetch("http://localhost:5000/api/check-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),  // Solo enviamos la contraseña
    });

    const passwordData = await passwordResponse.json();

    // Mostrar en consola si la contraseña existe o no
    if (passwordData.exists) {
      console.log("La contraseña existe.");
    } else {
      console.log("La contraseña no existe.");
    }

    return errors;
  };

  // Maneja el cambio en los campos del formulario
  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  // Limpiar los errores al modificar los campos
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");  // Limpiar error de correo
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica que todos los campos estén completos
    if (email === "" || password === "") {
      setFormError("Por favor, completa todos los campos.");
      return;
    }

    // Llamamos a la función checkIfExists para verificar el correo y la contraseña
    await checkIfExists();

    // Limpiar formulario después de verificar
    setEmail("");
    setPassword("");
    setFormError("");
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
          <h2 className="text-3xl font-bold mb-4">Iniciar sesión</h2>
          
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

              <label htmlFor="email"><b>Correo electrónico</b></label>
              <input
                className="appearance-none block w-full text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="email"
                placeholder="Correo electrónico"
                name="email"
                value={email}
                onChange={handleEmailChange}  
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
              <button
                type="submit"
                className="bg-blue-500 text-white py-3 px-4 rounded-full mt-4"
                disabled={isLoading}
              >
                {isLoading ? "Iniciar sesión..." : "Iniciar sesión"}
              </button>
            </form>
          )}
          <p className="mt-4">
            ¿Olvidaste tu contraseña? <Link to="/login" className="text-blue-500">Crear cuenta</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;


