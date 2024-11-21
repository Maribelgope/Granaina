import { useState, useEffect } from "react";
import 'tailwindcss/tailwind.css';
import Header from '../COMPONENTES/header.jsx';
import GoodHero from "../COMPONENTES/hero.jsx";
import PurchaseTimeline from '../COMPONENTES/process.jsx';
import Banner from "../COMPONENTES/setBanner.jsx";
import OtherCards from '../COMPONENTES/othercards.jsx';
import Carousel from '../COMPONENTES/carousel.jsx';
import Section from '../COMPONENTES/feactures.jsx';
import Offer from '../COMPONENTES/service.jsx'; 
import Footer from '../COMPONENTES/footer.jsx';

import ProductCardLoading from '../COMPONENTES/productCardLoading.jsx';
import ProductCardSimulado from '../COMPONENTES/ProductCardSimulado.jsx';  
import ProductInfoSimulado from '../COMPONENTES/ProductInfoSimulado.jsx';  

function Root() {
  const [productsInfo, setProductsInfo] = useState(null);
  const [error, setError] = useState(null);  // Para manejar el error

  const slides = [
    "/producto1.png",
    "/producto2.jpg",
    "/producto3.jpeg",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");

        // Verificar que la respuesta sea exitosa
        if (!response.ok) {
          throw new Error(`Error en la API: ${response.status}`);
        }

        // Intentar parsear como JSON
        const json = await response.json();
        setProductsInfo(json);
      } catch (error) {
        console.log("Error al obtener los datos:", error);
        setError(error.message);  // Guardar el mensaje de error
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <Header />
      <GoodHero />
      <PurchaseTimeline />
      <Banner />
      <OtherCards />
      <Carousel slides={slides} autoSlide={true} autoSlideInterval={3000} />

      <div className="p-4">
        <h2 className="text-2xl font-bold max-w-7xl mx-auto mb-4">Productos</h2>
        {error && <div className="text-red-500">{error}</div>}  {/* Mostrar error si lo hay */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto mb-32">
          {productsInfo && productsInfo.length !== 0 ? productsInfo.map((product) => (
            <ProductCardSimulado key={product._id} ProductInfoSimulado={product} />
          )) : (
            <>
              <ProductCardLoading /><div><h1>carta</h1></div>
              <ProductCardLoading /><div><h1>carta</h1></div>
              <ProductCardLoading /><div><h1>carta</h1></div>
              <ProductCardLoading /><div><h1>carta</h1></div>
            </>
          )}
        </div>
        <Section />
        <Offer />
        <Footer />
      </div>
    </div>
  );
}

export default Root;
