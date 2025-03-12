import { createContext, useContext, useState } from "react";
import { apiPost } from "../utils/api";
import PropTypes from "prop-types";

const AuthContext = createContext();

/**
 * AuthProvider Component
 * Provides authentication state and actions (login, logout) to its children.
 *
 * @param {React.ReactNode} children - The child components that will have access to the auth context.
 * @returns {JSX.Element} The authentication context provider.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    // Attempt to log in and update user state upon success.
    try {
      const response = await apiPost("/auth/login", {
        email: email,
        password: password
      });
      
      const userData = {
        id: response.id,
        name: response.name,
        email: response.email,
        role: response.role,
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
      // Clear the user state to log out.
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

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

/**
 * useAuth Hook
 * A custom hook to access the authentication context.
 *
 * @returns {object} The authentication context value.
 */
export const useAuth = () => useContext(AuthContext);