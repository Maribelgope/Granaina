import Header from "../COMPONENTES/header.jsx";
import { useCart } from "../hooks/useCart.js";
import { useAuthContext } from "../hooks/useAuthContext.js";

function PaymentPage() {
  const { cart } = useCart();
  const { user } = useAuthContext();

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/payment/purchase",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ cart }),
        }
      );
      const json = await response.json();
      if (response.ok) {
        console.log("Request");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="p-4">
        <p>Esto es una página de pruebas</p>
        <h2>Productos</h2>
        <ul>
          {cart &&
            cart.map((product) => (
              <li key={product._id}>
                <h3>{product.name}</h3>
                <h4>{product.price}€</h4>
                <h4>
                  {product.quantity}{" "}
                  {product.quantity == 1 ? "unidad" : "unidades"}
                </h4>
              </li>
            ))}
        </ul>
      </div>
      <button onClick={handlePayment}>Comprar</button>
    </div>
  );
}

export default PaymentPage;
