import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Header() { // Recibe la función setShowLoginModal como una prop
  return (
    <div className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">La Granaina</h1>
        <nav>
          <ul className="flex text-white">
            <li className="mr-4"><Link to="/">Inicio</Link></li>
            <li className="mr-4"><a href="#">Acerca de</a></li>
            <li className="mr-4"><a href="#">Productos</a></li>
            <li className="mr-4"><a href="#">Contacto</a></li>
            {/* <li className="mr-4"><a href="#" onClick={() => setShowLoginModal(true)}><FontAwesomeIcon icon={faUser} className="w-6 h-6" /></a></li> Agrega un manejo de evento onClick para abrir el modal de inicio de sesión */}
            <li className="mr-4"><Link to="/login" ><FontAwesomeIcon icon={faUser} className="w-6 h-6" /></Link></li> {/* Agrega un manejo de evento onClick para abrir el modal de inicio de sesión */}

            <li><a href="#"><FontAwesomeIcon icon={faShoppingCart} className="w-6 h-6" /></a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
