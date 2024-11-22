import { useState } from "react";
import { Url } from "../config";
import { toast } from "react-toastify";
export const useDelete = (ruta) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${Url + ruta}/${id}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return toast.success("Se elimino correctamente");
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteData, isLoading, error };
};
