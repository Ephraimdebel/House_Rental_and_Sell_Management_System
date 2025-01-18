import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/hero_banner/Hero";
import Product from "./components/product/Product";
import ProductSale from "./components/product/ProductSale";
import Home from "./pages/Home/Home";
import UserProfile from "./components/user_profile/user_profile";
import OwnerProfile from "./components/owner_profile/owner_profile";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import HouseSale from "./components/listingProperty/HouseList";
import HouseRent from "./components/listingProperty/HouseRent";
import Detail from "./components/DetailPage/Detail";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/productsale" element={<ProductSale />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/owner" element={<OwnerProfile />} />
        <Route path="/listingSale" element={<HouseSale />} />
        <Route path="/listingRent" element={<HouseRent />} />
        <Route path="/detail" element={<Detail />} /> {/* Updated Route */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
