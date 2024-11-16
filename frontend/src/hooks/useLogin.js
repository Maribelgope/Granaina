import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5173/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Verificar si la respuesta no es exitosa
      if (!response.ok) {
        setIsLoading(false);
        setError("Error en la conexión o servidor no disponible.");
        return;
      }

      // Obtener la respuesta como JSON
      const parsedResponse = await response.json();  // Aseguramos que sea un JSON

      if (response.ok) {
        // Si la respuesta es válida, guardar el usuario en el localStorage
        localStorage.setItem("user", JSON.stringify(parsedResponse));
        dispatch({ type: "LOGIN", payload: parsedResponse });
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setError(parsedResponse.error || "Ha ocurrido un error.");
      }
    } catch (err) {
      setIsLoading(false);
      setError("Ha ocurrido un error inesperado.");
    }
  };

  return { login, isLoading, error };
};
