import { Router } from "express";
import {
  createProfile,
  deleteProfile,
  getAllProfiles,
  getProfileById,
  getPublicProfile,
  previewProfile,
  publishProfile,
  unpublishProfile,
  updateProfile,
} from "../controllers/profile.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";


const profileRouter = Router();

// Profile CRUD
profileRouter.post("/",authUser, createProfile);
profileRouter.get("/",authUser, getAllProfiles);
profileRouter.get("/:profileId",authUser, getProfileById);
profileRouter.patch("/:profileId",authUser, updateProfile);
profileRouter.delete("/:profileId",authUser, deleteProfile);

// Publish / Unpublish
profileRouter.patch("/:profileId/publish",authUser, publishProfile);
profileRouter.patch("/:profileId/unpublish",authUser, unpublishProfile);

// Preview
profileRouter.get("/:profileId/preview",authUser, previewProfile);

// Public Profile
profileRouter.get("/public/:username", getPublicProfile);

export default profileRouter;
