import React from "react";
import { Outlet } from "react-router-dom";


import useAuth from "../hook/useAuth";
import RedirectPopup from "../pages/auth/components/RedirectPopup";

const PublicRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-background" />;
  }

  if (isAuthenticated) {
    return <RedirectPopup />;
  }

  return <Outlet />;
};

export default PublicRoute;