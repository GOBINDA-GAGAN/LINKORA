import { createContext, useState, useEffect } from "react";
import { toast } from "sonner";

import {
  loginService,
  registerService,
  logoutService,
  profileService,
} from "../services/authService";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Login
  const login = async (data) => {
    try {
      setLoading(true);

      const response = await loginService(data);

      setUser(response.user);
      setIsAuthenticated(true);

      toast.success(response.message || "Login successful!");
      // navigate("/home");

      return response;
    } catch (error) {
      toast.error(error.message || "Login failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register
  const register = async (data) => {
    try {
      setLoading(true);

      const response = await registerService(data);

      if (response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
      }

      toast.success(response.message || "Registration successful!");

      return response;
    } catch (error) {
      toast.error(error.message || "Registration failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      setLoading(true);

      await logoutService();

      setUser(null);
      setIsAuthenticated(false);

      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error(error.message || "Logout failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get Profile
  const getProfile = async () => {
    try {
      setLoading(true);

      const response = await profileService();

      setUser(response.user);
      setIsAuthenticated(true);

      return response;
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Check Authentication on App Load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) return;

      try {
        await getProfile();
      } catch {
        // Session expired or invalid
      }
    };

    checkAuth();
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    getProfile,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
