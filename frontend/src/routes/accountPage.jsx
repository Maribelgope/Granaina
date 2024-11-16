import { useState, useEffect } from "react";
import Header from "../COMPONENTES/header.jsx";
// import 'tailwindcss/tailwind.css';
// import Footer from '../COMPONENTES/footer.jsx';
import { useAuthContext } from "../hooks/useAuthContext.js";

function AccountPage() {
  const { user } = useAuthContext();

  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordFormIsLoading, setPasswordFormIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const validPassword = newPassword == repeatPassword;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const json = await response.json();
        if (response.ok) {
          setName(json.name);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/users", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        name: name,
      }),
    });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError(null)
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

  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center p-6">
        <form
          method="POST"
          onSubmit={handleSubmit}
          className="flex flex-col gap2"
        >
          <label>Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Guardar cambios</button>
        </form>
        <form
        onSubmit={handleChangePassword}
        className="bg-white rounded-lg shadow-lg p-6"
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
                <span className="text-red-800">
                  No coinciden
                </span>
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
      </div>
    </>
  );
}

export default AccountPage;
