import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./pages/landing/Home";
import Login from "./pages/auth/Loginpage";
import ForgotPassword from "./pages/auth/ForgotPassword";
import OtpVerification from "./pages/auth/OtpVerification";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import Account from "./pages/users/account/Account";
import PublicProfile from "./pages/users/profile/PublicProfile";
import AccountLayout from "./components/layout/AccountLayout";

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/verify-otp" element={<OtpVerification />} />
        <Route path="/:username" element={<PublicProfile />} />

        <Route path="/account" element={<AccountLayout />}>
          <Route path="" element={<Account />} />
        </Route>
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<h1>Welcome to Dashboard</h1>} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
