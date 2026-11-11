import profileApi from "../api/profileApi";

export const getPublicProfileService = async (username) => {
  return await profileApi.getPublicProfile(username);
};