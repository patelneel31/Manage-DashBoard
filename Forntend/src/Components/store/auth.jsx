// src/store/auth.jsx
import { useContext, createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const authorizationToken = `Bearer ${token}`;

  const storeTokenInLS = (newToken) => {
    localStorage.setItem("authToken", newToken);
    setToken(newToken);
  };

  const isLoggedIn = !!token;

  const LogoutUser = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    setUser(null);
  };

  const userAuthentication = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data/service");
      const data = await response.json();

      if (response.ok) {
        setServices(data);
      } else {
        console.error("Failed to fetch services:", data.message);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken && !token) {
      setToken(storedToken);
    }

    userAuthentication();
    fetchServices();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        LogoutUser,
        user,
        services,
        loading,
        authorizationToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
