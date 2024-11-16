import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (
    email,
    password,
    username,
    name,
    store = false,
    phoneNumber = null
  ) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          username,
          name,
          store,
          phoneNumber,
        }),
      });

      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
      } else {
        localStorage.setItem("user", JSON.stringify(json));

        dispatch({ type: "LOGIN", payload: json });

        setIsLoading(false);
        setError(null);
      }
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
    }
  };

  return { signup, isLoading, error };
};
