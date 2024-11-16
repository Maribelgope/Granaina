import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { Link, useParams } from "react-router-dom";

function EditProductInfo() {
  const { id } = useParams();

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
        "http://localhost:5000/api/storepanel/products/" + id,
        {
          method: "PATCH",
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
        console.log("Product edited");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/storepanel/products/" + id,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const json = await response.json();
        if (response.ok) {
          console.log(json);
          setProductName(json.name);
          setProductURLName(json.URLName);
          setProductDescription(json.description);
          setProductPrice(json.price);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex-1 p-6">
        <Link to="../">Productos</Link>
        <form
          className="bg-white p-6 rounded-lg shadow-lg mb-6"
          onSubmit={handleCreateProduct}
        >
          <h2 className="text-2xl font-bold mb-4">Editar el producto</h2>
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
            Guardar
          </button>
        </form>
      </div>
    </>
  );
}

export default EditProductInfo;
