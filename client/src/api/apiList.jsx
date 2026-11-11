const apiList = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    PROFILE: "/auth/profile/me",
    REFRESH: "/auth/refresh-token",
  },
  PROFILE: {
    PUBLICPROFILE: "/profile/public/:username",
  },
};

export default apiList;
