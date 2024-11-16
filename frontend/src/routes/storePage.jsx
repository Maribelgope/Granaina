import { useState, useEffect } from "react";
import ProductCard from "../COMPONENTES/tarjeta.jsx";
// import 'tailwindcss/tailwind.css';
import Header from "../COMPONENTES/header.jsx";
import { useParams } from "react-router-dom";

function ProductPage() {
  const { URLName } = useParams();
  const [storeInfo, setStoreInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/" + URLName
        );
        const json = await response.json();
        if (response.ok) {
          setStoreInfo(json);
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
        {storeInfo ? (
          <div className="flex max-w-7xl mx-auto gap-4">
            <h2 className="text-2xl font-bold">{storeInfo.name}</h2>
            {storeInfo.verified && <h3>Tienda verificada</h3>}
          </div>
        ) : (
          "Loading"
        )}
      </div>
    </div>
  );
}

export default ProductPage;
