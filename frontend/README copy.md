# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Aplicación Web de E-commerce - Frontend

Bienvenido al frontend de nuestra aplicación web de e-commerce! Este proyecto permite a los usuarios crear sus propias tiendas en línea y vender productos. A continuación, encontrarás información detallada sobre las tecnologías utilizadas, la configuración del proyecto y su estructura.
Los componentes son totalmente modulares por lo que podras estilizar a tu gusto cada componente. Sino tienes mucha experiencia con tailwind css te recomiendo este tutorial que es bastante completo y puedes apoyarte en el : https://www.youtube.com/watch?v=5HtRcMSO1Ro&t=2360s
Algunos componentes provienen de librerías populares y varios otros han sido creados manualmente para adaptarse a necesidades específicas del proyecto, permitiendo así una mayor flexibilidad y personalización.

## Tabla de Contenidos

- Características.
- Tecnologías Utilizadas/Bibliotecas UI.
- Instalación.
- Estructura del Proyecto.
- Configuración.
- Uso.
- Contribuciones.
- Licencia.

### Caracteristicas.

Registro y autenticación de usuarios.
Crear y gestionar una tienda en línea.
Vender productos a través de la tienda.
Diseño responsivo utilizando Tailwind Css
Desarrollo rápido con Vite.
Componentes modulares y reutilizables con tailwindUI, NextUI y PrimeReact.
Manejo eficiente de datos JSON para la comunicación entre frontend y backend.

### Tecnologías Utilizadas.

React: Biblioteca de JavaScript para construir interfaces de usuario
React Router: Enrutamiento declarativo para React.
Tailwind CSS: Framework CSS de utilidad para desarrollo rápido de UI.
Vite: Herramienta de desarrollo frontend para mejorar velocidad para un desarrolloque vuela.
NextUI: Biblioteca de UI para React. https://nextui.org/
PrimeReact:Componentes UI https://primereact.org/
Flowvite:Componentes UI https://flowbite.com/

# Estructura del Proyecto

ecommerce-frontend/
├── public/
├── src/
│ ├── COMPONENTES/
│ │ ├── header.jsx
│ │ ├── footer.jsx
│ │ └── feactures.jsx
│ │ └── morecards.jsx
│ │ └── novedades.jsx
│ │ └── otherscards.jsx
│ │ └── process.jsx
│ │ └── productcardloading.jsx
│ │ └── service.jsx
│ │ └── carousel.jsx  
│ ├── routes/
│ │ ├── about.jsx
│ │ ├── accountPage.jsx
│ │ └── Dashboard.jsx
│ │ └── clients.jsx
│ │ └── detailsproduct.jsx
│ │ └── EditProduct.jsx
│ │ └── EditProductInfo.jsx
│ │ └── error-page.jsx
│ │ └── login.jsx
│ │ └── Orders.jsx
│ │ └── ProductPage.jsx
│ │ └── register.jsx
│ │ └── RegisterStore.jsx
│ │ └── root.jsx
│ │ └── searchPage.jsx
│ │ └── storepage.jsx
│ │ └── storePanelPage.jsx
│ │ └── storePayments.jsx
│ │ └── StoreSettings.jsx
│ ├── hooks/
│ │ └── useCart.js
│ │ └── useAuthContext.js
│ │ └── useLogin.js
│ │ └── useLogout.js
│ │ └── useSignup.js
│  
│  
│ └── context/
│ │ └── AuthContext.jsx
│ │ └── cart.jsx

├── tailwind.config.js
├── tailwind.config.js
├── package.json
└── vite.config.js

-
