import { Profile } from "../models/profile.models.js";
import SocialMediaLink from "../models/socialmedialink.model.js";




export const manageSocialMediaLinks = async (req, res) => {
  try {
    const { action, profileId, linkId } = req.body;
    const { id } = req.user;

    switch (action) {

      // CREATE SOCIAL MEDIA LINK
      case "create": {
        const { platform, username } = req.body;

        if (!profileId || !platform || !username) {
          return res.status(400).json({
            success: false,
            message: "Profile ID, platform and username are required",
            data: null,
          });
        }

        const profile = await Profile.findOne({
          _id: profileId,
          user: id,
        });

        if (!profile) {
          return res.status(404).json({
            success: false,
            message: "Profile not found",
            data: null,
          });
        }

        // Check duplicate platform
        const existingLink = await SocialMediaLink.findOne({
          profileId,
          userId: id,
          platform,
        });

        if (existingLink) {
          return res.status(409).json({
            success: false,
            message: `${platform} link already exists in this profile`,
            data: null,
          });
        }

        const position = await SocialMediaLink.countDocuments({
          profileId,
          userId: id,
        });

        const socialMediaLink = await SocialMediaLink.create({
          userId: id,
          profileId,
          platform,
          username,
          position,
        });

        return res.status(201).json({
          success: true,
          message: "Social media link created successfully",
          data: socialMediaLink,
        });
      }

      // UPDATE SOCIAL MEDIA LINK
      case "update": {
        const { platform, username } = req.body;

        if (!linkId) {
          return res.status(400).json({
            success: false,
            message: "Link ID is required",
            data: null,
          });
        }

        const existingLink = await SocialMediaLink.findOne({
          _id: linkId,
          userId: id,
        });

        if (!existingLink) {
          return res.status(404).json({
            success: false,
            message: "Social media link not found",
            data: null,
          });
        }

        // Check duplicate platform if platform is changing
        if (platform && platform !== existingLink.platform) {
          const duplicatePlatform = await SocialMediaLink.findOne({
            profileId: existingLink.profileId,
            userId: id,
            platform,
          });

          if (duplicatePlatform) {
            return res.status(409).json({
              success: false,
              message: `${platform} link already exists in this profile`,
              data: null,
            });
          }
        }

        if (platform !== undefined) {
          existingLink.platform = platform;
        }

        if (username !== undefined) {
          existingLink.username = username;
        }

        await existingLink.save();

        return res.status(200).json({
          success: true,
          message: "Social media link updated successfully",
          data: existingLink,
        });
      }

      // DELETE SOCIAL MEDIA LINK
      case "delete": {
        if (!linkId) {
          return res.status(400).json({
            success: false,
            message: "Link ID is required",
            data: null,
          });
        }

        const socialMediaLink =
          await SocialMediaLink.findOneAndDelete({
            _id: linkId,
            userId: id,
          });

        if (!socialMediaLink) {
          return res.status(404).json({
            success: false,
            message: "Social media link not found",
            data: null,
          });
        }

        return res.status(200).json({
          success: true,
          message: "Social media link deleted successfully",
          data: null,
        });
      }

      // TOGGLE SOCIAL MEDIA LINK
      case "toggle": {
        if (!linkId) {
          return res.status(400).json({
            success: false,
            message: "Link ID is required",
            data: null,
          });
        }

        const socialMediaLink = await SocialMediaLink.findOne({
          _id: linkId,
          userId: id,
        });

        if (!socialMediaLink) {
          return res.status(404).json({
            success: false,
            message: "Social media link not found",
            data: null,
          });
        }

        socialMediaLink.isActive = !socialMediaLink.isActive;

        await socialMediaLink.save();

        return res.status(200).json({
          success: true,
          message: "Social media link status updated successfully",
          data: socialMediaLink,
        });
      }

      // REORDER SOCIAL MEDIA LINKS
      case "reorder": {
        const { links } = req.body;

        if (!profileId || !Array.isArray(links)) {
          return res.status(400).json({
            success: false,
            message: "Profile ID and valid links array are required",
            data: null,
          });
        }

        const profile = await Profile.findOne({
          _id: profileId,
          user: id,
        });

        if (!profile) {
          return res.status(404).json({
            success: false,
            message: "Profile not found",
            data: null,
          });
        }

        for (const link of links) {
          if (
            !link.linkId ||
            !Number.isInteger(link.position) ||
            link.position < 0
          ) {
            return res.status(400).json({
              success: false,
              message: "Invalid link ID or position",
              data: null,
            });
          }

          const updated = await SocialMediaLink.findOneAndUpdate(
            {
              _id: link.linkId,
              profileId,
              userId: id,
            },
            {
              position: link.position,
            },
            {
              runValidators: true,
            }
          );

          if (!updated) {
            return res.status(404).json({
              success: false,
              message: "One or more social media links were not found",
              data: null,
            });
          }
        }

        return res.status(200).json({
          success: true,
          message: "Social media links reordered successfully",
          data: null,
        });
      }

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid action",
          data: null,
        });
    }

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
      error: error.message,
    });
  }
};


// GET ALL SOCIAL MEDIA LINKS
export const getSocialMediaLinks = async (req, res) => {
  try {
    const { profileId } = req.params;
    const { id } = req.user;

    const profile = await Profile.findOne({
      _id: profileId,
      user: id,
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
        data: null,
      });
    }

    const socialMediaLinks = await SocialMediaLink.find({
      profileId,
      userId: id,
    }).sort({ position: 1 });

    return res.status(200).json({
      success: true,
      message: "Social media links fetched successfully",
      data: {
        socialMediaLinks,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch social media links",
      data: null,
      error: error.message,
    });
  }
};





