
import jwt from "jsonwebtoken";
import env from "../config/env.js";

// Verify access token
export function authUser(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Access token missing",
    });
  }

  const token = header.split(" ")[1];

  try {
    const payload = jwt.verify(
      token,
      env.ACCESS_TOKEN_SECRET
    );

    req.user = {
      id: payload.id,
      role: payload.role,
    };

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Access token expired",
      });
    }

    return res.status(401).json({
      message: "Invalid access token",
    });
  }
}

// Role-based authorization
export function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "You are not allowed to do this",
      });
    }

    next();
  };
}
