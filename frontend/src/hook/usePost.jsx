import { useState } from "react";
import { Url } from "../config";
import { toast } from "react-toastify";
export const usePost = (ruta) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (body) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${Url + ruta}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        console.log(response.statusText);
        throw new Error(`Error: ${response.statusText}`);
      }
      return toast.success("Se agrego correctamente");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { postData, isLoading, error };
};
