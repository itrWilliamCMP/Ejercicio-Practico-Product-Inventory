import React from "react";
import { useForm } from "react-hook-form";
import { useParams, Link } from "react-router-dom";
import Titulo from "../components/Titulos";
import SubTitulo from "../components/SubTitulo";
import InputText from "../components/InputText";
import SelectInput from "../components/SelectInput";
import Button from "../components/Button";
import useDataProduct from "../hooks/products/useDataProduct";
import { optionSelect } from "../utils/apiUrl";
import "../Styles/Products.css";

const Products = () => {
  const { id } = useParams();
  const methods = useForm();
  const { register, handleSubmit, errors /*, handleDelete*/ } = useDataProduct(methods);

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Titulo titulo={id ? "Editar Producto" : "Agregar Nuevo Producto"} />
      <SubTitulo titulo="Información del Producto" />

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputText
          name="producto"
          label="Nombre del Producto"
          placeholder="Ej: Laptop Gamer X"
          register={register}
          error={errors?.producto?.message}
        />

        <SelectInput
          name="categoria"
          label="Categoría"
          options={optionSelect}
          register={register}
          error={errors?.categoria?.message}
        />

        <InputText
          name="precio"
          label="Precio"
          placeholder="Ej: 1200.00"
          type="number"
          register={register}
          error={errors?.precio?.message}
        />

        <InputText
          name="stock"
          label="Cantidad en Stock"
          placeholder="Ej: 50"
          type="number"
          register={register}
          error={errors?.stock?.message}
        />

        <Button
          type="submit"
          text={id ? "Actualizar Producto" : "Guardar Producto"}
        />
      </form>

      <div className="mt-6">
        <Link
          to="/home"
          className="inline-block text-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition duration-200"
        >
          Regresar
        </Link>
      </div>
    </div>
  );
};

export default Products;
