import { useEffect, useState } from "react";
import { url } from "../../utils/apiUrl";
import { toast } from "react-hot-toast";

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Error al obtener productos");
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      toast.error("Error al obtener productos");
      setProducts([]);
    }
  };

  const getProductById = async (id) => {
    try {
      const response = await fetch(`${url}/${id}`);
      if (!response.ok) throw new Error("Error al obtener producto por ID");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener producto:", error);
      toast.error("Error al obtener producto");
      return null;
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return { products, getProductById, getProducts };
};

export default useFetchProducts;
