import express from "express";

import { authUser } from "../middlewares/auth.middleware.js";
import { getSocialMediaLinks, manageSocialMediaLinks } from "../controllers/socialmedialink.controller.js";


const socialmediarouter = express.Router();

// Create social media link
socialmediarouter.post("/", authUser, manageSocialMediaLinks);

// Get all social media links of a profile
socialmediarouter.get("/:profileId", authUser, getSocialMediaLinks);


export default socialmediarouter;
