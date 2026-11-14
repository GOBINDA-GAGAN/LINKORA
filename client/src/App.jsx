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
import DashboardLayout from "./components/layout/DashboardLayout";
import DeshboardHome from "./pages/users/dashboard/DeshboardHome";
import NewUsername from "./pages/users/dashboard/NewUsername";
import MyLinkora from "./pages/users/dashboard/MyLinkora";
import MyLinkoraLayout from "./components/layout/MyLinkoraLayout";

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

        <Route path="/new-profile/your-username" element={<NewUsername />} />

        <Route path="/home/link" element={<MyLinkoraLayout />}>
          <Route index element={<MyLinkora />} />
          <Route path="header" element={<h1>Header Page</h1>} />
          <Route path="design" element={<h1>Design Page</h1>} />
          <Route path="settings" element={<h1>Settings Page</h1>} />
        </Route>

        <Route path="/home" element={<DashboardLayout />}>
          <Route index element={<DeshboardHome />} />
        </Route>

        <Route path="/home/account" element={<AccountLayout />}>
          <Route path="" element={<Account />} />
        </Route>
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}></Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
