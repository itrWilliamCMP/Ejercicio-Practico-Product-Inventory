import { useEffect } from "react";
import { url } from "../../utils/apiUrl";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import useFetchProducts from "./useFetchProducts";

const useDataProduct = (methods) => {
  const { getProductById, getProducts } = useFetchProducts();
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const saveProductForm = async (dataForm) => {
    try {
      const cleanedData = {
        producto: dataForm.producto?.trim() || "",
        categoria: dataForm.categoria || "",
        precio: Number(dataForm.precio),
        stock: Number(dataForm.stock),
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedData),
      });

      if (!response.ok) throw new Error("Error al agregar producto");

      toast.success("Producto guardado exitosamente");
      navigate("/home");
    } catch (error) {
      console.error("Error al agregar producto:", error);
      toast.error("Error al agregar producto");
    } finally {
      reset();
      getProducts();
    }
  };

  const editProduct = async (dataForm) => {
    try {
      const cleanedData = {
        producto: dataForm.producto?.trim() || "",
        categoria: dataForm.categoria || "",
        precio: Number(dataForm.precio),
        stock: Number(dataForm.stock),
      };

      const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedData),
      });

      if (!response.ok) throw new Error("Error al actualizar producto");

      toast.success("Producto actualizado exitosamente");
      navigate("/home");
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      toast.error("Error al actualizar producto");
    } finally {
      reset();
      getProducts();
    }
  };

  const handleProductAction = (dataForm) => {
    if (id) {
      editProduct(dataForm);
    } else {
      saveProductForm(dataForm);
    }
  };

  const loadProduct = async () => {
    if (id) {
      const product = await getProductById(id);
      if (product) {
        reset({
          producto: product?.producto || "",
          categoria: product?.categoria || "",
          precio: product?.precio || "",
          stock: product?.stock || "",
        });
      }
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  return {
    register,
    handleSubmit: handleSubmit(handleProductAction),
    errors,
  };
};

export default useDataProduct;
