import React, { useState } from "react";
import { useCart } from "../hooks/useCart";
import DetailsProduct from "../routes/detailsproduct.jsx";

const ProductCard = ({ productInfo }) => {
  const { cart, addToCart, removeOneItemFromCart, removeFromCart } = useCart();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const cartProduct = cart.find((product) => {
    return product._id === productInfo._id;
  });

  const handleAddToCart = () => {
    addToCart(productInfo);
  };

  const handleRemoveOneItemFromCart = () => {
    removeOneItemFromCart(productInfo);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(productInfo);
  };

  const handleOpenDetails = () => {
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
  };

  return (
    <div className="flex flex-col bg-white shadow-md rounded-lg h-64">
      {productInfo.imageUrl ? (
        <img
          src={productInfo.imageUrl}
          alt={productInfo.title}
          className="w-full h-48 rounded-lg mb-2 rounded-t-md"
        />
      ) : (
        <div className="h-48 w-full bg-gray-300 rounded-t-md">
          {productInfo.title}
        </div>
      )}
      <div className="flex flex-col gap-2 p-2">
        <h2 className="text-lg font-semibold">{productInfo.name}</h2>
        {cartProduct ? (
          <>
            <div className="flex gap-4 items-center">
              <button
                className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition duration-300 text-center"
                onClick={handleAddToCart}
              >
                +
              </button>
              {cartProduct.quantity}
              <button
                className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition duration-300 text-center disabled:bg-gray-300"
                onClick={handleRemoveOneItemFromCart}
                disabled={cartProduct.quantity <= 1}
              >
                -
              </button>
            </div>
            <button
              type="button"
              className="group inline-block rounded-full bg-gradient-to-r from-green-500 via-green-500 to-green-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
              onClick={handleRemoveFromCart}
            >
              <span className="block rounded-full bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent">
                Eliminarl del carrito
              </span>
            </button>
          </>
        ) : (
          <button
            type="button"
            className="group inline-block rounded-full bg-gradient-to-r from-green-400 via-green-400 to-green-400 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
            onClick={handleAddToCart}
          >
            <span className="block rounded-full bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent">
              Añadir al carrito
            </span>
          </button>
        )}
        <a
          className="flex items-center justify-center py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border-2 border-blue-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={handleOpenDetails}
          style={{ textDecoration: "none" }}
        >
          Ver detalle
        </a>
      </div>
      <DetailsProduct isOpen={isDetailsOpen} onClose={handleCloseDetails} />
    </div>
  );
};

export default ProductCard;
