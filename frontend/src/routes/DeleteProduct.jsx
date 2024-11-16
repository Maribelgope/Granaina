import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { Link, useParams } from "react-router-dom";

function DeleteProduct() {
  const { id } = useParams();

  const { user } = useAuthContext();

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/storepanel/products/" + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.ok) {
        console.log("Product deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex-1 p-6">
        <Link to="../">Productos</Link>
        <form
          className="bg-white p-6 rounded-lg shadow-lg mb-6"
          onSubmit={handleCreateProduct}
        >
          <h2 className="text-2xl font-bold mb-4">Borrar producto</h2>
          <p>¿Estas seguro de que deseas eliminar el producto?</p>
          <button
            type="submit"
            className="grid-flow-row bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-2"
          >
            Eliminar
          </button>
        </form>
      </div>
    </>
  );
}

export default DeleteProduct;
