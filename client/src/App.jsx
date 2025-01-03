import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/hero_banner/Hero";
import Product from "./components/product/Product";
import ProductSale from "./components/product/ProductSale";
import Home from "./pages/Home/Home";

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Hero />} />
    //     <Route path="/products" element={<Product />} />
    //     <Route path="/productsale" element={<ProductSale />} />
    //   </Routes>
    // </Router>
    <Home />
  );
}

export default App;
