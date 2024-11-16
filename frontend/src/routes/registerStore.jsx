import { useState, useEffect } from "react";
import Header from "../COMPONENTES/header";
import { useSignup } from "../hooks/useSignup";
// import 'tailwindcss/tailwind.css';
// import Footer from '../COMPONENTES/footer.jsx';
import { Link } from "react-router-dom";

function RegisterStore() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password, null, name, true);
  };
  return (
    <div className="App">
      <Header />
      <div className="p-4">
        <div className="flex flex-col max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Crear una nueva tienda</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label htmlFor="email">Correo electrónico</label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="email"
              placeholder="Correo electónico"
              name="email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Contraseña</label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="password"
              placeholder="Contraseña"
              name="password"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="name">Nombre de la tienda</label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Nombre de la tienda"
              name="name"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="phoneNumber">Numero de teléfono</label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Numero de teléfono"
              name="phoneNumber"
              defaultValue={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {/* <Link to="/forgotpassword" className="text-blue-500 text-sm">¿Olvidaste tu contraseña?</Link> */}
            <p className="text-sm">
              ¿Ya tienes una tienda creada?{" "}
              <Link to="/login" className="text-blue-700 font-bold">
                Iniciar sesión
              </Link>
            </p>
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-500/40"
              disabled={isLoading}
            >
              Crear una nueva tienda
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterStore;
