import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/hero_banner/Hero";
import EditProfile from "./components/edit_profile/edit_profile";
import Product from "./components/product/Product";
import ProductSale from "./components/product/ProductSale";
import Home from "./pages/Home/Home";
import UserProfile from "./components/user_profile/user_profile";
import PostHouse from "./components/post_house/post_house";
import OwnerProfile from "./components/owner_profile/owner_profile";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/productsale" element={<ProductSale />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/posthouse" element={<PostHouse />} />
        <Route path="/owner" element={<OwnerProfile />} />
        <Route path="/editprofile" element={<EditProfile />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
