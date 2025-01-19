import React, { createContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
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
import DetailSale from "./components/DetailPage/DetailSale";
import Login from "./pages/Login/Login";
import Four04 from "./components/Four04/Four04";
import AboutUs from "./components/AboutUs/AboutUs";
import { ToastContainer } from "react-toastify";
import axios from "./Api/axios";
import AddHouseForm from "./components/AddProperty/AddProperty ";
import HouseProfile from "./components/Chat/HostProfile";
import FilterPage from "./components/filterPage/filterList";
import FilterList from "./components/filterPage/filterList";
import ListingHouseSell from "./components/LinstingHouse/ListingHouseSell";
import ListingHouseRent from "./components/LinstingHouse/ListingHouseRent";
import AdminDashboard from "./components/AdminDasbord/adminDashbord";

export const AppState = createContext();

function App() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  // Function to handle logout
  const handleLogout = () => {
    // Remove token and user-related data from localStorage
    localStorage.removeItem("token");

    localStorage.removeItem("username");
    localStorage.removeItem("userid");

    // Reset user state
    setUser(null);

    // Navigate to login page
    navigate("/login");
  };

  // Function to check if user is logged in
  async function checkUser() {
    try {
      const { data } = await axios.get("/users/checkUser", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser(data);
    } catch (err) {
      console.log(err.response);
      navigate("/login");
    }
  }
  useEffect(() => {
    if (token) {
      console.log("Token exists, calling checkUser...");

      checkUser();
    }
  }, [token]);
  return (
    <AppState.Provider value={{ user, setUser, handleLogout }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/products" element={<Product />} />
        <Route path="/productsale" element={<ProductSale />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/owner" element={<OwnerProfile />} />
        <Route path="/listingSale" element={<ListingHouseSell />} />
        <Route path="/listingRent" element={<ListingHouseRent />} />
        <Route path="/filter" element={<FilterList />} />
        <Route path="/house/:id" element={<Detail />} />
        <Route path="/houseSale/:id" element={<DetailSale />} />
        <Route path="/addproperty" element={<AddHouseForm />} />
        <Route path="/adminDashbord" element={<AdminDashboard />} />
        <Route path="*" element={<Four04 />} />
      </Routes>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AppState.Provider>
  );
}

export default App;
