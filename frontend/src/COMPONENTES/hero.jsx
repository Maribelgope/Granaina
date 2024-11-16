import React from 'react';

const GoodHero = () => {
  return (
    <section className="px-0 py-0 mx-auto max-w-full relative h-screen"> 
      <div className="absolute inset-0">
        <img 
          alt="Un salón" 
          src="./public/C3.jpg" 
          className="h-full w-full object-cover" 
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-white text-6xl font-bold bg-black p-4 rounded-md">
          Granada Edición Limitada
        </h2>
      </div>

      <div className="absolute inset-0 flex items-center justify-center mt-60">
        <a href="" className="text-black hover:text-gray-500">
          <h2 className="text-6xl font-bold bg-white p-4 rounded-md">
            Haz tu pedido
          </h2>
        </a>
      </div>
    </section>
  );
};

export default GoodHero;




