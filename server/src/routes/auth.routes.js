import express from "express";

import {
  getMe,
  login,
  logout,
  refresh,
  register,
} from "../controllers/auth.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/refresh", refresh);
authRoutes.post("/logout", logout);
authRoutes.get("/me", authUser, getMe);

export default authRoutes;
