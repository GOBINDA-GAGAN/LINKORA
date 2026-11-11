import mongoose from "mongoose";

// NOTE: no indexes in any model on purpose (no unique, no index: true).
// Duplicate emails are checked in the register controller instead.
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    plan: {
      type: String,
      enum: ["free", "starter", "pro", "premium"],
      default: "free",
    },
    // bcrypt hash of the user's current refresh token (null when logged out)
    refreshToken: { type: String, default: null, select: false },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export const User = mongoose.model("User", userSchema);
