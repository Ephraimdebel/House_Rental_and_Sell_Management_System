// ProtectedRoute.jsx
import React, { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AppState } from "../../App"; // Your context that stores the authentication state

const ProtectedRoute = ({ children,msg,redirect }) => {
  const token = localStorage.getItem("token");
  const { user } = useContext(AppState); 
  const navigate = useNavigate();

  if (!token) {
    return <Navigate to="/login" state={{ msg, redirect }} />;
  }

  return children;
};

export default ProtectedRoute;
