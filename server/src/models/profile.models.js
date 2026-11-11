import mongoose, { Schema } from "mongoose";

const profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    profileLink: {
      type: String,
      unique: true,
      required: true,
    },
    profileImage: {
      type: String,
      default: "",
    },

    title: {
      type: String,
      required: true,
      default: "My Profile",
    },

    bio: {
      type: String,
      default: "",
    },

    titleStyle: {
      type: String,
      enum: ["normal", "bold", "italic"],
      default: "bold",
    },

    titleFont: {
      type: String,
      default: "Inter",
    },

    titleColor: {
      type: String,
      default: "#171717",
    },

    bannerImage: {
      type: String,
      default: "",
    },

    bannerLink: {
      type: String,
      default: "",
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Profile = mongoose.model("Profile", profileSchema);
