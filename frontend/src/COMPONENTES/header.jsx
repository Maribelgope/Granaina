import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "tailwindcss/tailwind.css";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import logo from '../assets/logo.png';


function Header() {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [showCategories, setShowCategories] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const categories = [
    "Category 1",
    "Category 2",
    "Category 3",
    "Category 4",
    "Category 5",
    "Category 6",
  ];

  return (
    <header className="bg-red-800 text-white flex h-20 justify-center items-center px-10">
      <div className="max-w-7xl w-full flex justify-between gap-5  items-center  p-4 mx-auto ">
        <div className="flex gap-5 ">
          <img src={logo} alt="Logo" className="w-20 h-auto " />
          <nav className="flex items-center space-x-9 ml-[40%]  "> 
            <ul className="flex  space-x-8 ">
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gray-300">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/searchPage" className="hover:text-gray-300">
                  Buscador 
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-gray-300">
                  Promociones 
                </Link>
              </li>
            </ul>
            <div className="relative">
              <a
                href="/"
                className="hover:text-gray-300"
                onClick={toggleCategories}>
                Categorias 
              </a>
              {showCategories && (
                <ul className="absolute mt-2 bg-gray-800 text-white p-2 rounded-lg shadow-md z-50">
                  {categories.map((category, index) => (
                    <li key={index} className="hover:text-gray-300">
                      {category}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </nav>
        </div>
        <div className="flex items-center space-x-5 text-nowrap ">
          {user ? (
            <div className="flex gap-4 items-center">
              <p>{user.email}</p>
              {user.store ? (
                <Link to="/storepanel" className="bg-red-800 text-white px-4 py-2 rounded w-full hover:bg-red-700">Mi tienda</Link>
              ) : (
                <Link to="/account" className="bg-red-800 text-white px-4 py-2 rounded w-full hover:bg-red-700">Cuenta</Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded w-full hover:bg-red-600"
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <>
              {/* Icono de usuario */}
              <Link to="/login">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-lg cursor-pointer hover:text-gray-300" />
              </Link>
            </>
          )}
          {/* Icono de carrito */}
          <Link to="/cart">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="text-lg cursor-pointer hover:text-gray-300" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
