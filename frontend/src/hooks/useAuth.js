// frontend/src/hooks/useAuth.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => useContext(AuthContext);

// Helper function to get token
export const getToken = () => {
  return localStorage.getItem("token"); // or from AuthContext state
};