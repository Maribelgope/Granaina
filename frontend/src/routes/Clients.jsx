import React, { useState } from 'react';

function Clients() {
  const [clients, setClients] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
  ]);

  const [newClient, setNewClient] = useState({ name: '', email: '', phone: '' });

  const handleAddClient = () => {
    setClients([...clients, { id: clients.length + 1, ...newClient }]);
    setNewClient({ name: '', email: '', phone: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const handleDeleteClient = (id) => {
    setClients(clients.filter(client => client.id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Clientes</h2>
      <div className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={newClient.name}
          onChange={handleInputChange}
          className="border p-2 mr-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newClient.email}
          onChange={handleInputChange}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          name="phone"
          placeholder="Teléfono"
          value={newClient.phone}
          onChange={handleInputChange}
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddClient}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Añadir Cliente
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Teléfono</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td className="py-2 px-4 border-b">{client.id}</td>
              <td className="py-2 px-4 border-b">{client.name}</td>
              <td className="py-2 px-4 border-b">{client.email}</td>
              <td className="py-2 px-4 border-b">{client.phone}</td>
              <td className="py-2 px-4 border-b text-right">
                <button
                  className="inline-block border-e p-3 text-gray-700 hover:bg-gray-50 focus:relative"
                  title="Edit Product"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleDeleteClient(client.id)}
                  className="inline-block p-3 text-gray-700 hover:bg-gray-50 focus:relative"
                  title="Delete Product"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clients;
