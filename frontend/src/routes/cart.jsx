import Header from "../COMPONENTES/header.jsx";
import { useCart } from "../hooks/useCart.js";
import { Link } from "react-router-dom";

function CartPage() {
  const { cart } = useCart();

  return (
    <div className="App">
      <Header />
      <div className="p-4">
        {cart ? (
          <>
            {cart.map((product) => (
              <Link
                key={product._id}
                to={"/product/" + product.URLName}
                className=""
              >
                <h2 className="text-2xl font-bold">{product.name}</h2>
              </Link>
            ))}
            <Link to="/processPayment">Comprar</Link>
          </>
        ) : (
          "No hay productos en el carrito de la compra"
        )}
      </div>
    </div>
  );
}

export default CartPage;
