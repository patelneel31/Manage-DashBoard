import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Components/store/auth";

export const Logout = () => {
  const { LogoutUser } = useAuth();

  useEffect(() => {
    LogoutUser();
  }, []);

  return <Navigate to="/login" />;
};
