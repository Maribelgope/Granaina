import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from "react-feather";

export default function Carousel({
  slides,
  autoSlide = false,
  autoSlideInterval = 3000,
}) {
  const [curr, setCurr] = useState(0);
  const prev = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="relative overflow-hidden h-96 w-3/4 mx-auto bg-red-800">
      <div className=" flex transition-transform ease-out duration-500" 
      style={{ transform: `translateX(-${curr * 100}%)` }}> 
        {slides.map((slide, index) => (
            <div key={index} className=" w-full flex-none flex justify-center items-center ">
            <img key={index} src={slide} alt={`Slide ${index}`} className="w-3/4 h-96 object-contain" />
            </div>
        ))}
      </div>

      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
        <button onClick={prev} className="p-3 rounded-full shadow bg-white text-gray-800 hover:bg-white">
          <ChevronLeft size={40} />
        </button>
        <button onClick={next} className="p-3 rounded-full shadow bg-white text-gray-800 hover:bg-white">
          <ChevronRight size={40} />
        </button>
      </div>
      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${curr === i ? "bg-white" : "bg-gray-300"}`}
            />
          ))}
       
        </div>
      </div>
    </div>

    
  );
}
