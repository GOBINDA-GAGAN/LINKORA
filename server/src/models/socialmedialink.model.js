
import mongoose from "mongoose";

const socialMediaLinkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },

    platform: {
      type: String,
      required: true,
      enum: [
        "whatsapp",
        "x",
        "youtube",
        "instagram",
        "facebook",
        "linkedin",
        "threads",
        "github",
        "telegram",
        "email",
      ],
    },

    username: {
      type: String,
      required: true,
      trim: true,
    },

    position: {
      type: Number,
      min: 0,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const SocialMediaLink = mongoose.model(
  "SocialMediaLink",
  socialMediaLinkSchema
);

export default SocialMediaLink;
