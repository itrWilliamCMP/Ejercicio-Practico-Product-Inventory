import { url } from "../../utils/apiUrl";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useProductAction = (getProducts) => {
  const navigate = useNavigate();

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error al eliminar producto");
      }
      toast.success("Producto eliminado exitosamente");
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      toast.error("Error al eliminar producto");
    } finally {
      getProducts();
    }
  };

  const handleUpdateProduct = (id) => {
    navigate(`/products/${id}`);
  };

  return {
    deleteProduct,
    handleUpdateProduct,
  };
};

export default useProductAction;
