import React from "react";

const Banner = () => {
  return (
    <section className="px-0 py-12 mx-auto max-w-7xl sm:px-4">
      <div className="grid items-center grid-cols-1 gap-10 px-4 py-6 overflow-hidden text-white bg-red-800 card card-body sm:rounded-lg md:px-20 md:grid-cols-5 lg:gap-0">
        <div className="col-span-1 md:col-span-3">
          <h2 className="mb-3 font-serif text-2xl font-normal leading-tight lg:text-3xl">
          Nos encanta mantenernos en contacto por correo electrónico.
          </h2>
          <p className="mb-6 text-sm font-semibold lg:text-base">
          Puedes esperar que lleguen a tu bandeja de entrada mensajes de inspiración para tu hogar "justo en el momento adecuado".
           Y, por supuesto, ¡serás el primero en enterarte cuando lancemos nuevas piezas de decoración en la tienda para transformar 
           tu espacio!
          </p>
          <a
            href="contacto.php"
            className="w-full text-red-800 bg-white hover:bg-grey-300 focus:outline-none focus:ring-2  rounded-lg px-4 py-2 text-center font-bold text-lg transition duration-300 ease-in-out sm:w-auto"
          >
            Empezar
          </a>
        </div>
        <div className="col-span-1 md:col-span-2 flex justify-center md:justify-end">
          <img
            src="public/Escritorio-removebg.png"
            className="w-full max-w-[300px] lg:max-w-[450px] select-none"
            alt="Mac App"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
