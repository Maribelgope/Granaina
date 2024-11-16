import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

function StoreSettings() {
  // Estado para el formulario de información de la tienda
  // const [storeInfo, setStoreInfo] = useState({
  //   name: "",
  //   description: "",
  //   address: "",
  //   email: "",
  //   phone: "",
  // });

  // Función para manejar cambios en el formulario
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setStoreInfo({ ...storeInfo, [name]: value });
  // };

  // Función para manejar el envío del formulario
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Lógica para enviar la información al servidor o almacenarla localmente
  //   console.log("Formulario enviado:", storeInfo);
  // };

  const { user } = useAuthContext();

  const [name, setName] = useState(user.name);
  const [description, setDescription] = useState(user.name);
  const [address, setAddress] = useState(user.name);
  const [email, setEmail] = useState(user.name);
  const [phoneNumber, setPhoneNumber] = useState(user.name);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordFormIsLoading, setPasswordFormIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [newEmail, setNewEmail] = useState(null);
  const [emailFormIsLoading, setEmailFormIsLoading] = useState(false);
  const [emailError, setEmailError] = useState(null);

  const validPassword = newPassword == repeatPassword;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/storepanel/account",
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const json = await response.json();
        if (response.ok) {
          setName(json.name);
          setDescription(json.description);
          setAddress(json.address);
          setEmail(json.email);
          setPhoneNumber(json.phoneNumber);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "http://localhost:5000/api/storepanel/account",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          name: name,
          description: description,
          address: address,
          email: email,
          phoneNumber: phoneNumber,
        }),
      }
    );
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError(null);
    setPasswordFormIsLoading(true);
    const response = await fetch(
      "http://localhost:5000/api/users/changePassword",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          password: password,
          newPassword: newPassword,
        }),
      }
    );
    const JSONResponse = await response.json();
    if (!response.ok) {
      setError(JSONResponse.error);
    }
    setPasswordFormIsLoading(false);
  };

  const handleChangeEmail = async (e) => {
    e.preventDefault();
    setEmailError(null);
    setEmailFormIsLoading(true);
    const response = await fetch(
      "http://localhost:5000/api/users/changeEmail",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          newEmail: newEmail,
        }),
      }
    );
    const JSONResponse = await response.json();
    if (!response.ok) {
      setEmailError(JSONResponse.error);
    }
    setEmailFormIsLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Ajustes de la Tienda</h1>
      {/* Formulario para configurar la información de la tienda */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-6 mb-6"
      >
        <h2 className="text-xl font-semibold mb-4">Información de la Tienda</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block font-medium text-gray-700 mb-1"
            >
              Nombre:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block font-medium text-gray-700 mb-1"
            >
              Descripción:
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block font-medium text-gray-700 mb-1"
            >
              Dirección:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              defaultValue={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border rounded px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-medium text-gray-700 mb-1"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block font-medium text-gray-700 mb-1"
            >
              Teléfono:
            </label>
            <input
              type="number"
              id="phone"
              name="phone"
              defaultValue={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border rounded px-4 py-2 w-full"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Guardar Cambios
        </button>
      </form>
      <form
        onSubmit={handleChangePassword}
        className="bg-white rounded-lg shadow-lg p-6 mb-6"
      >
        <h2 className="text-xl font-semibold mb-4">Cambiar contraseña</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label
              htmlFor="actualPassword"
              className="block font-medium text-gray-700 mb-1"
            >
              Contraseña actual:
            </label>
            <input
              type="password"
              id="actualPassword"
              name="actualPassword"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block font-medium text-gray-700 mb-1"
            >
              Nueva contraseña:
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              defaultValue={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border rounded px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="repeatPassword"
              className="block font-medium text-gray-700 mb-1"
            >
              Repetir contraseña:{" "}
              {!validPassword && (
                <span className="text-red-800">No coinciden</span>
              )}
            </label>
            <input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              defaultValue={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="border rounded px-4 py-2 w-full"
            />
          </div>
        </div>
        {error ? (
          <div className="bg-red-200 rounded p-3 text-red-950 mb-4">
            {error}
          </div>
        ) : (
          ""
        )}
        <button
          type="submit"
          disabled={passwordFormIsLoading || !validPassword}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-500/40"
        >
          Actualizar contraseña
        </button>
      </form>
      <form
        onSubmit={handleChangeEmail}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Cambiar contraseña</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label
              htmlFor="actualPassword"
              className="block font-medium text-gray-700 mb-1"
            >
              Nuevo correo electrónico:
            </label>
            <input
              type="newEmail"
              id="newEmail"
              name="newEmail"
              defaultValue={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="border rounded px-4 py-2 w-full"
            />
          </div>
        </div>
        {emailError ? (
          <div className="bg-red-200 rounded p-3 text-red-950 mb-4">
            {emailError}
          </div>
        ) : (
          ""
        )}
        <button
          type="submit"
          disabled={emailFormIsLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-500/40"
        >
          Cambiar el correo electrónico
        </button>
      </form>
      {/* Otras secciones de configuración pueden agregarse aquí */}
    </div>
  );
}

export default StoreSettings;
