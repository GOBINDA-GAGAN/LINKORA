import authApi from "../api/authApi";


export const loginService = async (data) => {
  const response = await authApi.login(data);

  if (response.accessToken) {
    localStorage.setItem("accessToken", response.accessToken);
  }

  return response;
};

export const registerService = async (data) => {
  const response = await authApi.register(data);

  if (response.accessToken) {
    localStorage.setItem("accessToken", response.accessToken);
  }

  return response;
};

export const logoutService = async () => {
  try {
    await authApi.logout();
  } finally {
    localStorage.removeItem("accessToken");
  }
};

export const profileService = async () => {
  return await authApi.getProfile();
};