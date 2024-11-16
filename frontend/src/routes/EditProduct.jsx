import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { Link } from "react-router-dom";

function EditProduct() {
  const [productsInfo, setProductsInfo] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productURLName, setProductURLName] = useState("");

  const { user } = useAuthContext();

  // Aca defini las diapositivas para el Carousel
  const slides = [
    <div key="1">Slide 1</div>,
    <div key="2">Slide 2</div>,
    <div key="3">Slide 3</div>,
  ];

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/storepanel/products/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            name: productName,
            description: productDescription,
            price: productPrice,
            URLName: productURLName,
          }),
        }
      );
      const json = await response.json();
      if (response.ok) {
        console.log("Product added");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/storepanel/products",
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const json = await response.json();
        if (response.ok) {
          setProductsInfo(json);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const renderTableRow = (data) => {
    return (
      <tr key={data.id} className={data.isHighlighted ? "bg-gray-100" : ""}>
        <td className="border px-4 py-2">{data.name}</td>
        <td className="border px-4 py-2">{data.email}</td>
        <td className="border px-4 py-2">{data.role}</td>
        <td className="border px-4 py-2">
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
        </td>
      </tr>
    );
  };

  return (
    <>
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Productos</h1>
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

        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-bold mb-4">Productos</h2>
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="w-1/3 px-4 py-2">Nombre</th>
                <th className="w-1/3 px-4 py-2">Descripción</th>
                <th className="w-1/3 px-4 py-2">Precio</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {productsInfo &&
                productsInfo.map((product) => (
                  <tr key={product._id}>
                    <td className="border px-4 py-2">{product.name}</td>
                    <td className="border px-4 py-2">{product.description}</td>
                    <td className="border px-4 py-2">{product.price}€</td>
                    <td>
                      <Link to={product._id}>Editar</Link>
                      <Link to={product._id + "/delete"}>Borrar</Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <form
          className="bg-white p-6 rounded-lg shadow-lg mb-6"
          onSubmit={handleCreateProduct}
        >
          <h2 className="text-2xl font-bold mb-4">Añadir un nuevo producto</h2>
          <div className="grid grid-cols-2 gap-2">
            <label>Nombre</label>
            <input
              type="text"
              onChange={(e) => setProductName(e.target.value)}
              defaultValue={productName}
            />
            <label>URLName</label>
            <input
              type="text"
              onChange={(e) => setProductURLName(e.target.value)}
              defaultValue={productURLName}
            />
            <label>Descripción</label>
            <input
              type="text"
              onChange={(e) => setProductDescription(e.target.value)}
              defaultValue={productDescription}
            />
            <label>Precio</label>
            <input
              type="number"
              onChange={(e) => setProductPrice(e.target.value)}
              defaultValue={productPrice}
            />
          </div>
          <button
            type="submit"
            className="grid-flow-row bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-2"
          >
            Crear
          </button>
        </form>

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

        {/* AGREGAR BOTONES */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-bold mb-4">Recent Users</h2>
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="w-1/3 px-4 py-2">Name</th>
                <th className="w-1/3 px-4 py-2">Email</th>
                <th className="w-1/3 px-4 py-2">Role</th>
                <th className="w-1/3 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {[
                {
                  id: 1,
                  name: "Escaloneta",
                  email: "DS10@example.com",
                  role: "Admin",
                },
                {
                  id: 2,
                  name: "Jane Smith",
                  email: "DS10@example.com",
                  role: "User",
                  isHighlighted: true,
                },
                {
                  id: 3,
                  name: "Escaloneta",
                  email: "bob@example.com",
                  role: "User",
                },
              ].map((user) => renderTableRow(user))}
            </tbody>
          </table>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="w-1/4 px-4 py-2">Order ID</th>
                <th className="w-1/4 px-4 py-2">Customer</th>
                <th className="w-1/4 px-4 py-2">Amount</th>
                <th className="w-1/4 px-4 py-2">Status</th>
                <th className="w-1/4 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {[
                {
                  id: 12345,
                  customer: "KEVIN",
                  amount: "$100",
                  status: "Pending",
                },
                {
                  id: 12346,
                  customer: "Rafaelo",
                  amount: "$150",
                  status: "Completed",
                  isHighlighted: true,
                },
                {
                  id: 12347,
                  customer: "Rafaelo",
                  amount: "$200",
                  status: "Processing",
                },
              ].map((order) => renderTableRow(order))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default EditProduct;
