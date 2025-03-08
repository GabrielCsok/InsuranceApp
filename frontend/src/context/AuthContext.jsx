import React, { createContext, useContext, useState } from "react";
import { apiPost } from "../utils/api"; // Import your API utility

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await apiPost("/auth/login", {
        email: email,
        password: password
      });
      
      // Expect backend to return user data including role
      const userData = {
        id: response.id,
        name: response.name,
        email: response.email,
        role: response.role // Get role from backend response
      };
      
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try { 
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);