import React, { createContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import axios from "./Api/axios";
import Four04 from "./components/Four04/Four04";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
// import LayOut from "./pages/LayOut/LayOut";
export const AppState = createContext();


function App() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleLogout = () => {
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
      const { data } = await axios.get("/users/check", {
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
  },[token]);
  // console.log(user)
  return (
    <AppState.Provider value={{ user, setUser, handleLogout }}>
      <Routes>
        {/* <Route path="/" element={<LayOut />}>
       
          <Route path="/" element={
             <ProtectedRoute msg="Welcome to Evangadi Forum" redirect = "/">
              <HomePage />
              </ProtectedRoute>} />
          
          <Route path="*" element={ 
            <Four04 />
          } />
        </Route> */}
          <Route path="/login" element={<Login />} />
      </Routes>
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
