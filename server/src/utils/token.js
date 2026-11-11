
import crypto from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import env from "../config/env.js";

// Generate access token
export function generateAccessToken(user) {
  return jwt.sign(
    {
      id: user._id.toString(),
      role: user.role,
    },
    env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: env.ACCESS_TOKEN_EXPIRY,
    }
  );
}

// Generate refresh token
export function generateRefreshToken(user) {
  return jwt.sign(
    {
      id: user._id.toString(),
    },
    env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: env.REFRESH_TOKEN_EXPIRY,
    }
  );
}

// SHA-256 digest
function digest(token) {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
}

// Hash refresh token
export async function hashRefreshToken(token) {
  return bcrypt.hash(digest(token), 10);
}

// Compare refresh token
export async function compareRefreshToken(token, hash) {
  return bcrypt.compare(digest(token), hash);
}
