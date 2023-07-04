import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Home from "./pages/home";
import Product from "./pages/productpage/product";
import Categorie from "./pages/categorie";

function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to="/Home" replace />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/Categorie" element={<Categorie />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default MainRouter;
