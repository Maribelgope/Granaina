import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext.js";

function StorePayments() {
  // Estado para almacenar la lista de pagos
  const [payments, setPayments] = useState([]);
  // Estado para almacenar el pago seleccionado
  const [selectedPayment, setSelectedPayment] = useState(null);
  // Contexto de autenticación
  const { user } = useAuthContext();

  // Función para obtener la lista de pagos
  // useEffect(() => {
  //   const fetchPayments = async () => {
  //     try {
  //       const response = await fetch("API_URL/payments", {
  //         headers: { Authorization: `Bearer ${user.token}` },
  //       });
  //       const data = await response.json();
  //       setPayments(data);
  //     } catch (error) {
  //       console.error("Error fetching payments:", error.message);
  //     }
  //   };

  //   fetchPayments();
  // }, [user.token]);

  // Función para mostrar los detalles del pago seleccionado
  const showPaymentDetails = (payment) => {
    setSelectedPayment(payment);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Pagos</h1>
      {/* Filtros para la lista de pagos */}
      <div className="mb-4">
        <label
          htmlFor="status"
          className="block font-medium text-gray-700 mb-1"
        >
          Estado:
        </label>
        <select id="status" name="status" className="border rounded px-4 py-2">
          <option value="all">Todos</option>
          <option value="pending">Pendientes</option>
          <option value="completed">Completados</option>
          <option value="failed">Fallidos</option>
        </select>
      </div>
      {/* Lista de pagos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {payments.map((payment) => (
          <div key={payment.id} className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Pago #{payment.id}</h2>
            <p className="mb-2">
              <strong>Cliente:</strong> {payment.customer}
            </p>
            <p className="mb-2">
              <strong>Total:</strong> ${payment.total}
            </p>
            <p className="mb-2">
              <strong>Estado:</strong> {payment.status}
            </p>
            <button
              onClick={() => showPaymentDetails(payment)}
              className="text-blue-500 hover:text-blue-700"
            >
              Ver detalles
            </button>
          </div>
        ))}
      </div>
      {/* Detalles del pago seleccionado */}
      {selectedPayment && (
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">
            Detalles del Pago #{selectedPayment.id}
          </h2>
          <p>
            <strong>Cliente:</strong> {selectedPayment.customer}
          </p>
          <p>
            <strong>Total:</strong> ${selectedPayment.total}
          </p>
          <p>
            <strong>Estado:</strong> {selectedPayment.status}
          </p>
          {/* Aquí puedes mostrar más detalles del pago si es necesario */}
        </div>
      )}
    </div>
  );
}

export default StorePayments;
