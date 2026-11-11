import baseApi from "./baseApi";
import apiList from "./apiList";

const profileApi = {
  getPublicProfile: (username) => {
    const endpoint = apiList.PROFILE.PUBLICPROFILE.replace(
      ":username",
      encodeURIComponent(username),
    );

    return baseApi.get(endpoint);
  },
};

export default profileApi;
