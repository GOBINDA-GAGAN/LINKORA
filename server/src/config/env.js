
import dotenv from "dotenv";

// The ONLY place that reads process.env.
dotenv.config({ quiet: true });

const env = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
  isProduction: process.env.NODE_ENV === "production",
  CLIENT_URL: process.env.CLIENT_URL,

  MONGO_URI: process.env.MONGO_URI,

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,

  ACCESS_TOKEN_EXPIRY:
    process.env.ACCESS_TOKEN_EXPIRY || "15m",

  REFRESH_TOKEN_EXPIRY:
    process.env.REFRESH_TOKEN_EXPIRY || "7d",
};

// Freeze environment configuration
export default Object.freeze(env);
