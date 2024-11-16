import React from "react";
import Root from "./routes/root.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// Pages
import AboutUs from "./routes/about.jsx";
import AccountPage from "./routes/accountPage";
import ErrorPage from "./routes/error-page.jsx";
import Login from "./routes/login.jsx";
import ProductPage from "./routes/productPage.jsx";
import Register from "./routes/register.jsx";
import RegisterStore from "./routes/registerStore.jsx";
import StorePage from "./routes/storePage.jsx";
import StorePanelPage from "./routes/storePanelPage.jsx";
import SearchPage from "./routes/searchPage.jsx"; // Importa la nueva página de búsqueda
import EditProduct from "./routes/EditProduct.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import StorePayments from "./routes/StorePayments.jsx";
import Clients from "./routes/Clients.jsx";
import Orders from "./routes/Orders.jsx";
import StoreSettings from "./routes/StoreSettings.jsx";
import EditProductInfo from "./routes/EditProductInfo.jsx";
import DeleteProduct from "./routes/DeleteProduct.jsx";
import CartPage from "./routes/cart.jsx";
import PaymentPage from "./routes/PaymentPage.jsx";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter errorElement={<ErrorPage />}>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/registerstore"
            element={!user ? <RegisterStore /> : <Navigate to="/" />}
          />
          <Route
            path="/storepanel"
            element={
              user && user.store ? <StorePanelPage /> : <Navigate to="/login" />
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="clients" element={<Clients />} />
            <Route path="products">
              <Route index element={<EditProduct />} />
              <Route path=":id" element={<EditProductInfo />} />
              <Route path=":id/delete" element={<DeleteProduct />} />
            </Route>
            <Route path="orders" element={<Orders />} />
            <Route path="payments" element={<StorePayments />} />
            <Route path="settings" element={<StoreSettings />} />
          </Route>
          <Route
            path="/account"
            element={user ? <AccountPage /> : <Navigate to="/login" />}
          />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/product/:URLName" element={<ProductPage />} />
          <Route path="/store/:URLName" element={<StorePage />} />
          <Route path="/search" element={<SearchPage />} />{" "}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/processPayment" element={<PaymentPage />} />
          {/* Agrega la nueva ruta de búsqueda */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
