import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faRotateLeft, faTruck, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

export default function Offer() {
  return (
    <div className="w-3/4 mx-auto mt-20" id="offer">
      <div className="p-20"> 
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="py-3">
            <FontAwesomeIcon icon={faCartShopping} className="text-blue-800 text-4xl mx-auto mb-2" />
            <h3 className="text-lg font-bold">Envío gratis</h3>
            <p>En pedidos superiores a $1000</p>
          </div>
          <div className="py-3">
            <FontAwesomeIcon icon={faRotateLeft} className="text-green-800 text-4xl mx-auto mb-2" />
            <h3 className="text-lg font-bold">Devoluciones gratuitas</h3>
            <p>En 30 días</p>
          </div>
          <div className="py-3">
            <FontAwesomeIcon icon={faTruck} className="text-yellow-800 text-4xl mx-auto mb-2" />
            <h3 className="text-lg font-bold">Entrega rápida</h3>
            <p>Global</p>
          </div>
          <div className="py-3">
            <FontAwesomeIcon icon={faThumbsUp} className="text-red-800 text-4xl mx-auto mb-2" />
            <h3 className="text-lg font-bold">Gran variedad</h3>
            <p>Recomendados</p>
          </div>
        </div>
      </div>
    </div>
  );
}
