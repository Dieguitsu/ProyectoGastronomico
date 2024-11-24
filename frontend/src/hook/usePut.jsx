import { useState } from "react";
import { Url } from "../config";
import { toast } from "react-toastify";
export const useUpdate = (ruta) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateData = async (id, body) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${Url + ruta}/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return toast.success("Se actualizo correctamente");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { updateData, isLoading, error };
};
