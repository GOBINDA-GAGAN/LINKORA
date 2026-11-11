
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import env from "../config/env.js";


import {
  generateAccessToken,
  generateRefreshToken,
  hashRefreshToken,
  compareRefreshToken,
} from "../utils/token.js";
import { User } from "../models/user.model.js";

const REFRESH_COOKIE = "refreshToken";

// Cookie options
function getCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "strict",
    secure: env.isProduction,
    path: "/api/v1/auth",
  };
}

// Public user response
function toPublicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    city: user.city,
    createdAt: user.createdAt,
  };
}

// Generate tokens and save refresh token
async function issueTokens(res, user) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = await hashRefreshToken(refreshToken);
  await user.save();

  const { exp } = jwt.decode(refreshToken);

  res.cookie(REFRESH_COOKIE, refreshToken, {
    ...getCookieOptions(),
    expires: new Date(exp * 1000),
  });

  return accessToken;
}

// Reject refresh token
function rejectRefresh(res, message) {
  res.clearCookie(REFRESH_COOKIE, getCookieOptions());
  return res.status(401).json({ message });
}

// POST /api/v1/auth/register
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return res.status(400).json({
      message: "name, email and password are required",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters",
    });
  }

  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await User.findOne({
    email: normalizedEmail,
  });

  if (existingUser) {
    return res.status(409).json({
      message: "Email is already registered",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email: normalizedEmail,
    password: hashedPassword,
  });

  const accessToken = await issueTokens(res, user);

  return res.status(201).json({
    message: "Registered successfully",
    user: toPublicUser(user),
    accessToken,
  });
};

// POST /api/v1/auth/login
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return res.status(400).json({
      message: "email and password are required",
    });
  }

  const user = await User.findOne({
    email: email.trim().toLowerCase(),
  }).select("+password");

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const accessToken = await issueTokens(res, user);

  return res.json({
    message: "Logged in successfully",
    user: toPublicUser(user),
    accessToken,
  });
};

// POST /api/v1/auth/refresh
export const refresh = async (req, res) => {
  const token = req.cookies[REFRESH_COOKIE];

  if (!token) {
    return rejectRefresh(res, "Refresh token missing");
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      env.REFRESH_TOKEN_SECRET
    );
  } catch {
    return rejectRefresh(
      res,
      "Invalid or expired refresh token"
    );
  }

  const user = await User.findById(payload.id).select(
    "+refreshToken"
  );

  if (!user || !user.refreshToken) {
    return rejectRefresh(res, "Invalid refresh token");
  }

  const isMatch = await compareRefreshToken(
    token,
    user.refreshToken
  );

  if (!isMatch) {
    return rejectRefresh(res, "Invalid refresh token");
  }

  const accessToken = await issueTokens(res, user);

  return res.json({ accessToken });
};

// POST /api/v1/auth/logout
export const logout = async (req, res) => {
  const token = req.cookies[REFRESH_COOKIE];

  if (token) {
    try {
      const payload = jwt.verify(
        token,
        env.REFRESH_TOKEN_SECRET
      );

      await User.findByIdAndUpdate(payload.id, {
        refreshToken: null,
      });
    } catch {
      // Invalid or expired token
    }
  }

  res.clearCookie(REFRESH_COOKIE, getCookieOptions());

  return res.json({
    message: "Logged out successfully",
  });
};

// GET /api/v1/auth/me
export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.json({
    user: toPublicUser(user),
  });
};
