import React from "react";

function Dashboard() {
  // Datos de ejemplo
  const recentUsers = [
    { id: 1, name: "Escaloneta", email: "DS10@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "DS10@example.com", role: "User" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User" },
  ];

  const recentOrders = [
    { id: "12345", customer: "KEVIN", amount: "$100", status: "Pending" },
    { id: "12346", customer: "Rafaelo", amount: "$150", status: "Completed" },
    { id: "12347", customer: "Rafaelo", amount: "$200", status: "Processing" },
  ];

  const renderTableRow = (data) => {
    return (
      <tr key={data.id}>
        <td className="border px-4 py-2">{data.name || data.customer}</td>
        <td className="border px-4 py-2">{data.email || data.amount}</td>
        <td className="border px-4 py-2">{data.role || data.status}</td>
        <td className="border px-4 py-2 text-right">
          <span className="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
            {/* BOTONES PARA EDITAR Y BORRAR */}
            <button
              className="inline-block border-e p-3 text-gray-700 hover:bg-gray-50 focus:relative"
              title="Edit"
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
              className="inline-block p-3 text-gray-700 hover:bg-gray-50 focus:relative"
              title="Delete"
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
          </span>
        </td>
      </tr>
    );
  };

  return (
    <>
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          {/* BUSCADOR */}
          <div>
            <input
              type="text"
              placeholder="Search..."
              className="border rounded py-2 px-3"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-2">
              Search
            </button>
          </div>
        </div>

        {/* CONTENIDO DEL DASHBOARD */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-2">Total Sales</h2>
            <p className="text-gray-700">$23,456</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-2">Total Orders</h2>
            <p className="text-gray-700">1,234</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-2">Total Products</h2>
            <p className="text-gray-700">567</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-2">Total Users</h2>
            <p className="text-gray-700">789</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-bold mb-4">Recent Users</h2>
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="w-1/4 px-4 py-2">Name</th>
                <th className="w-1/4 px-4 py-2">Email</th>
                <th className="w-1/4 px-4 py-2">Role</th>
                <th className="w-1/4 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {recentUsers.map((user) => (
                <tr key={user.id}>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.role}</td>
                  <td className="border px-4 py-2 text-right">
                    <span className="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
                      {/* BOTONES PARA EDITAR Y BORRAR*/}
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
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
