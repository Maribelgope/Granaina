import React, { useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

const CardCarousel = () => {
  const cards = [
    { id: 1, title: 'Tarjeta 1', content: 'Contenido de la tarjeta 1', description: 'Breve descripción 1', imageUrl: '/producto5.jpeg' },
    { id: 2, title: 'Tarjeta 2', content: 'Contenido de la tarjeta 2', description: 'Breve descripción 2', imageUrl: '/producto6.jpeg' },
    { id: 3, title: 'Tarjeta 3', content: 'Contenido de la tarjeta 3', description: 'Breve descripción 3', imageUrl: '/producto7.jpeg' },
    { id: 4, title: 'Tarjeta 4', content: 'Contenido de la tarjeta 4', description: 'Breve descripción 4', imageUrl: '/producto6.jpeg' },
    { id: 5, title: 'Tarjeta 5', content: 'Contenido de la tarjeta 5', description: 'Breve descripción 5', imageUrl: '/producto5.jpeg' },
    { id: 6, title: 'Tarjeta 6', content: 'Contenido de la tarjeta 6', description: 'Breve descripción 6', imageUrl: '/producto7.jpeg' },
    { id: 7, title: 'Tarjeta 7', content: 'Contenido de la tarjeta 7', description: 'Breve descripción 7', imageUrl: '/producto6.jpeg' },
    { id: 8, title: 'Tarjeta 8', content: 'Contenido de la tarjeta 8', description: 'Breve descripción 8', imageUrl: '/producto5.jpeg' },
  ];

  // Función para barajar el array de tarjetas
  const shuffleCards = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledCards = shuffleCards(cards); // Barajar las tarjetas

  const scrollRef = useRef(null);

  const animateScroll = (scrollContainer, targetScroll, duration) => {
    const initialScroll = scrollContainer.scrollLeft;
    const startTime = performance.now();

    const scrollStep = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const scrollProgress = Math.min(1, elapsedTime / duration);
      const newScroll = initialScroll + (targetScroll - initialScroll) * scrollProgress;
      scrollContainer.scrollLeft = newScroll;

      if (scrollProgress < 1) {
        requestAnimationFrame(scrollStep);
      }
    };

    requestAnimationFrame(scrollStep);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      const targetScroll = scrollContainer.scrollLeft - 200; // Definir el desplazamiento deseado
      const duration = 500; // Duración de la animación en milisegundos
      animateScroll(scrollContainer, targetScroll, duration);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      const targetScroll = scrollContainer.scrollLeft + 200; // Definir el desplazamiento deseado
      const duration = 500;                                        // Duración de la animación en milisegundos
      animateScroll(scrollContainer, targetScroll, duration);
    }
  };

  return (
    <div className="relative my-8 p-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-700 relative">NOVEDADES</h2>
      <div className="flex overflow-hidden" ref={scrollRef}>
        {shuffledCards.map(card => (
       <div key={card.id} className="flex-none w-60 bg-white shadow-md mx-6 my-2 rounded-lg p-4">
            <img src={card.imageUrl} alt={card.title} className="w-full h-auto rounded-lg mb-2" />
            <h2 className="text-lg font-semibold mb-2">{card.title}</h2>
            <p className="text-gray-600">{card.content}</p>
            <p className="text-sm text-gray-500 mt-2">{card.description}</p>
            <button className="bg-blue-500 text-white py-1 px-4 rounded mt-2 hover:bg-blue-600 transition duration-300">
              Ver detalle
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition duration-300"
      >
        <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition duration-300"
      >
        <ChevronRightIcon className="h-6 w-6 text-gray-600" />
      </button>
    </div>
  );
};

export default CardCarousel;
