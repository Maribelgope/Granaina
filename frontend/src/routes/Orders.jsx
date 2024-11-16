import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { Link } from "react-router-dom";
import StatusText from "../COMPONENTES/Status.jsx";

function Orders() {
  // Estado para almacenar la lista de pedidos
  const [orders, setOrders] = useState(null);
  // Estado para almacenar el pedido seleccionado
  const [selectedOrder, setSelectedOrder] = useState(null);
  // Contexto de autenticación
  const { user } = useAuthContext();

  const [filteredOrders, setFilteredOrders] = useState(orders)

  // Función para obtener la lista de pedidos
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/storepanel/purchases/clientspurchases", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await response.json();
        setOrders(data);
        setFilteredOrders(data)
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user.token]);

  // Función para mostrar los detalles del pedido seleccionado
  const showOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleChangeFilters = (e) => {
    const statusText = e.target.value
    const statusNumber = statusText == 'all' ? null : statusText == 'pending' ? 0 : statusText == 'processing' ? 1 : 2;
    if(statusNumber !== null){
      setFilteredOrders(orders.filter((order) => order.status == statusNumber))
    }else{
      setFilteredOrders(orders)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Pedidos</h1>
      {/* Filtros para la lista de pedidos */}
      <div className="mb-4">
        <label htmlFor="status" className="block font-medium text-gray-700 mb-1">Estado:</label>
        <select id="status" name="status" className="border rounded px-4 py-2" onChange={handleChangeFilters}>
          <option value="all">Todos</option>
          <option value="pending">Pendientes</option>
          <option value="completed">Completados</option>
          <option value="processing">En proceso</option>
        </select>
      </div>
      {/* Lista de pedidos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredOrders && filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Pedido #{order.id}</h2>
            <p className="mb-2"><strong>Pago:</strong> {order.price}€</p>
            <p className="mb-2"><strong>Cliente:</strong> {order.customer.name}</p>
            <p className="mb-2"><strong>Total:</strong> {order.total}€</p>
            <p className="mb-2"><strong>Estado:</strong><StatusText status={order.status}/></p>
            <Link to={order.id} className="text-blue-500 hover:text-blue-700">Ver detalles</Link>
          </div>
        ))}
      </div>
      {/* Detalles del pedido seleccionado */}
      {selectedOrder && (
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Detalles del Pedido #{selectedOrder.id}</h2>
          <p><strong>Cliente:</strong> {selectedOrder.customer}</p>
          <p><strong>Total:</strong> ${selectedOrder.total}</p>
          <p><strong>Estado:</strong> {selectedOrder.status}</p>
          {/* Aquí puedes mostrar más detalles del pedido si es necesario */}
        </div>
      )}
    </div>
  );
}

export default Orders;
