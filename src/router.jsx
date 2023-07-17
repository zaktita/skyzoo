import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import App from "./App";
import Home from "./pages/home";
import Product from "./pages/productpage/product";
import Categorie from "./pages/categorie";
import SearchResaults from "./pages/searchResaults";
import ShoppingCartProvider from "./context/ShoppingCartContext";
import Bag from "./pages/productpage/bag";

function MainRouter() {
  return (
    <ShoppingCartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Navigate to="/Home" replace />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/product/:product_id" element={<Product />} />
            <Route path="/Category/:urlCategory" element={<Categorie />} />
            <Route path="/search/:searchKeyWord" element={<SearchResaults />} />
            <Route path="/Bag" element={<Bag />} />
          </Route>
        </Routes>
      </Router>
    </ShoppingCartProvider>
  );
}

export default MainRouter;
