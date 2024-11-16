import { useState, useEffect } from "react";
import ProductCard from "../COMPONENTES/tarjeta.jsx";
// import 'tailwindcss/tailwind.css';
import Header from "../COMPONENTES/header.jsx";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../hooks/useCart.js";

function ProductPage() {
  const { URLName } = useParams();
  const [productInfo, setProductInfo] = useState(null);
  const { cart, addToCart, removeOneItemFromCart, removeFromCart } = useCart();

  const cartProduct = productInfo
    ? cart.find((product) => {
        return product._id == productInfo._id;
      })
    : null;

  const handleAddToCart = () => {
    addToCart(productInfo);
  };

  const handleRemoveOneItemFromCart = () => {
    removeOneItemFromCart(productInfo);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(productInfo);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/products/" + URLName
        );
        const json = await response.json();
        if (response.ok) {
          setProductInfo(json);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="p-4">
        {productInfo ? (
          <div className="grid lg:grid-cols-2 max-w-7xl mx-auto gap-4">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">{productInfo.name}</h2>
              <h3>{productInfo.description}</h3>
            </div>
            <div className="flex gap-4 justify-end items-center p-2 border-2 border-zinc-200 rounded-md">
              <Link
                to={"/store/" + productInfo.sellerInfo.username}
                className="text-2xl"
              >
                {productInfo.sellerInfo.name}
              </Link>
              <h4 className="text-xl">{productInfo.price}€</h4>
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
                    onClick={handleRemoveFromCart}
                    className="bg-red-800 hover:bg-red-700 active:bg-red-600 text-white rounded-full py-2 px-4"
                  >
                    Eliminar del carrito
                  </button>
                </>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="bg-green-800 hover:bg-green-700 active:bg-green-600 text-white rounded-full py-2 px-4"
                >
                  Añadir al carrito
                </button>
              )}
            </div>
          </div>
        ) : (
          "Loading"
        )}
      </div>
    </div>
  );
}

export default ProductPage;
