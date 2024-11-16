import React from 'react';
import Root from './routes/root.jsx'
import './index.css'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// Pages
import AboutUs from './routes/about.jsx'
import AccountPage from './routes/accountPage';
import ErrorPage from './routes/error-page.jsx';
import Login from './routes/login.jsx';
import ProductPage from './routes/productPage.jsx';
import Register from './routes/register.jsx';
import RegisterStore from './routes/registerStore.jsx'
import StorePage from './routes/storePage.jsx';
import StorePanel from './routes/storePanel.jsx';

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter errorElement={<ErrorPage />}>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path="/registerstore" element={!user ? <RegisterStore /> : <Navigate to="/" />} />
          <Route path="/storepanel" element={user && user.store == true ? <StorePanel /> : <Navigate to="/login" />} />
          <Route path="/account" element={user ? <AccountPage /> : <Navigate to="/login" />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/product/:URLName" element={<ProductPage />} />
          <Route path="/store/:URLName" element={<StorePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;