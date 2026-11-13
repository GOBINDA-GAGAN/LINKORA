import env from "../config/env.js";
import { profilePerAccount } from "../constants/profileConstants.js";
import { Profile } from "../models/profile.models.js";
import SocialMediaLink from "../models/socialmedialink.model.js";
import { User } from "../models/user.model.js";

// Create new profile


export const createProfile = async (req, res) => {
  try {
    const {
      username,
      profileImage,
      title,
      bio,
      titleColor,
      titleStyle,
      titleFont,
      bannerImage,
    } = req.body;

    const { id } = req.user;

    // Find user
    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Validate username
    if (!username || !username.trim()) {
      return res.status(400).json({
        success: false,
        message: "Username is required",
      });
    }

    const normalizedUsername = username.trim().toLowerCase();

    // Check username availability
    const isUserNameExist = await Profile.findOne({
      username: normalizedUsername,
    });

    if (isUserNameExist) {
      return res.status(409).json({
        success: false,
        message: "Username already exists. Try another one.",
      });
    }

    // Get profile limit
    const limit = profilePerAccount[existingUser.plan];

    if (limit === undefined) {
      return res.status(400).json({
        success: false,
        message: "Invalid subscription plan",
      });
    }

    // Count existing profiles
    const profileCount = await Profile.countDocuments({
      user: id,
    });

    // Check profile limit
    if (profileCount >= limit) {
      return res.status(403).json({
        success: false,
        message: `Your ${existingUser.plan} plan allows only ${limit} profiles`,
      });
    }

    // Generate profile link
    const profileLink =
      `${env.CLIENT_URL.replace(/\/$/, "")}/${normalizedUsername}`;

    // Create profile
    const newProfile = await Profile.create({
      user: id,
      username: normalizedUsername,
      profileLink,
      profileImage,
      title,
      bio,
      titleColor,
      titleStyle,
      titleFont,
      bannerImage,
      isPublished: false,
    });

    // Updated metadata
    const metaData = {
      profileCount: profileCount + 1,
      profileLimit: limit === Infinity ? "unlimited" : limit,
      remainingProfiles:
        limit === Infinity ? "unlimited" : limit - (profileCount + 1),
    };

    return res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: {
        metaData,
        newProfile,
      },
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Username already exists. Try another one.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create profile",
      error: error.message,
    });
  }
};


// Get all user's profiles

export const getAllProfiles = async (req, res) => {
  try {
    const { id } = req.user;

    // Find user
    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Profile limits
    const profilePerAccount = {
      free: 5,
      starter: 20,
      pro: 50,
      premium: Infinity,
    };

    const limit = profilePerAccount[existingUser.plan];

    // Find all profiles
    const allProfiles = await Profile.find({
      user: id,
    }).select("-user");

    // Metadata
    const totalProfiles = allProfiles.length;

    const metadata = {
      plan: existingUser.plan,
      totalProfiles,
      profileLimit: limit === Infinity ? "unlimited" : limit,
      remainingProfiles:
        limit === Infinity ? "unlimited" : Math.max(0, limit - totalProfiles),
    };

    return res.status(200).json({
      success: true,
      message: "Profiles fetched successfully",
      data: {
        metadata,
        allProfiles,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch profiles",
      error: error.message,
    });
  }
};

// Get profile by ID

export const getProfileById = async (req, res) => {
  try {
    const { profileId } = req.params;
    const { id } = req.user;

    const profile = await Profile.findOne({
      _id: profileId,
      user: id,
    }).select("-user");

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: profile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
};

// Update profile



export const updateProfile = async (req, res) => {
  try {
    const { profileId } = req.params;
    const { id } = req.user;

    const allowedFields = [
      "username",
      "profileImage",
      "title",
      "bio",
      "titleColor",
      "titleStyle",
      "titleFont",
      "bannerImage",
      "bannerLink",
    ];

    const updateData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update",
      });
    }

    if (updateData.username !== undefined) {
      updateData.username = updateData.username.trim().toLowerCase();

      if (!updateData.username) {
        return res.status(400).json({
          success: false,
          message: "Username cannot be empty",
        });
      }

      const existingProfile = await Profile.findOne({
        username: updateData.username,
        _id: { $ne: profileId },
      });

      if (existingProfile) {
        return res.status(409).json({
          success: false,
          message: "Username already exists. Try another username.",
        });
      }

      // Automatically regenerate profile link
      updateData.profileLink =
        `${env.CLIENT_URL.replace(/\/$/, "")}/${updateData.username}`;
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { _id: profileId, user: id },
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    ).select("-user");

    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedProfile,
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Username already exists. Try another username.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};


// Delete profile

export const deleteProfile = async (req, res) => {
  try {
    const { profileId } = req.params;
    const { id } = req.user;

    const deletedProfile = await Profile.findOneAndDelete({
      _id: profileId,
      user: id,
    });

    if (!deletedProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
      data: {
        profileId: deletedProfile._id,
        username: deletedProfile.username,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete profile",
      error: error.message,
    });
  }
};

// Publish profile

export const publishProfile = async (req, res) => {
  try {
    const { profileId } = req.params;
    const { id } = req.user;

    const publishedProfile = await Profile.findOneAndUpdate(
      {
        _id: profileId,
        user: id,
      },
      {
        $set: { isPublished: true },
      },
      {
        new: true,
        runValidators: true,
      },
    ).select("-user");

    if (!publishedProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile published successfully",
      data: publishedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to publish profile",
      error: error.message,
    });
  }
};

// Unpublish profile

export const unpublishProfile = async (req, res) => {
  try {
    const { profileId } = req.params;
    const { id } = req.user;

    const unpublishedProfile = await Profile.findOneAndUpdate(
      {
        _id: profileId,
        user: id,
      },
      {
        $set: { isPublished: false },
      },
      {
        new: true,
        runValidators: true,
      },
    ).select("-user");

    if (!unpublishedProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile unpublished successfully",
      data: unpublishedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to unpublish profile",
      error: error.message,
    });
  }
};

// Preview profile
export const previewProfile = async (req, res) => {
  try {
    const { profileId } = req.params;
    const { id } = req.user;

    const profile = await Profile.findOne({
      _id: profileId,
      user: id,
    }).select("-user");

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile preview fetched successfully",
      data: profile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to preview profile",
      error: error.message,
    });
  }
};

// Get public profile


export const getPublicProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const profile = await Profile.findOne({
      username,
      isPublished: true,
    }).lean();

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Public profile not found",
        data: null,
      });
    }

    const socialMediaLinks = await SocialMediaLink.find({
      profileId: profile._id,
      isActive: true,
    })
      .select("platform username position")
      .sort({ position: 1 })
      .lean();

    const socialUrls = {
      youtube: (username) => `https://youtube.com/${username}`,
      instagram: (username) => `https://instagram.com/${username.replace("@", "")}`,
      facebook: (username) => `https://facebook.com/${username}`,
      linkedin: (username) => `https://linkedin.com/in/${username}`,
      github: (username) => `https://github.com/${username}`,
      x: (username) => `https://x.com/${username.replace("@", "")}`,
      threads: (username) => `https://threads.net/${username}`,
      telegram: (username) => `https://t.me/${username}`,
      whatsapp: (username) => `https://wa.me/${username}`,
    };

    const formattedSocialLinks = socialMediaLinks.map((link) => ({
      platform: link.platform,
      username: link.username,
      url: socialUrls[link.platform]?.(link.username) || null,
      icon: link.platform,
      position: link.position,
    }));

    return res.status(200).json({
      success: true,
      message: "Public profile fetched successfully",
      data: {
        ...profile,
        socialMediaLinks: formattedSocialLinks,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch public profile",
      data: null,
    });
  }
};

