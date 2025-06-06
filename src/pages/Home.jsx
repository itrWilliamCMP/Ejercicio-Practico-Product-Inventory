import { Link } from "react-router-dom";
import Titulo from "../components/Titulos";
import Button from "../components/Button";
import ButtonDelete from "../components/ButtonDelete";
import useFetchProducts from "../hooks/products/useFetchProducts";
import useProductActions from "../hooks/products/useProductAction";
import "../Styles/Home.css"

const Home = () => {
  const { products, getProducts } = useFetchProducts();
  const { deleteProduct, handleUpdateProduct } = useProductActions(getProducts);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/products"
        className="text-2xl font-bold text-gray-900 mb-4 bg-green-100 p-2 rounded w-full text-center hover:bg-green-200 transition-colors block mb-6"
      >
        Agregar Producto
      </Link>

      <Titulo titulo="Inventario de Productos" />
      <p className="mt-1 text-sm text-gray-600 mb-4">
        Lista de productos disponibles en Tecno Market.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700 text-left text-sm">
            <tr>
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Nombre Producto</th>
              <th className="px-4 py-2 border-b">Categoría</th>
              <th className="px-4 py-2 border-b">Precio</th>
              <th className="px-4 py-2 border-b">Cantidad en Stock</th>
              <th className="px-4 py-2 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-2">{product.id}</td>
                  <td className="px-4 py-2">{product.producto}</td>
                  <td className="px-4 py-2">{product.categoria}</td>
                  <td className="px-4 py-2">
                    ${Number(product.precio || 0).toFixed(2)}
                  </td>
                  <td className="px-4 py-2">{product.stock}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Button
                      text="Editar"
                      onClick={() => handleUpdateProduct(product.id)}
                    />
                    <ButtonDelete
                      text="Eliminar"
                      onClick={() => deleteProduct(product.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No hay productos disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
