import baseApi from "./baseApi";
import apiList from "./apiList";

const authApi = {
  register: (data) => baseApi.post(apiList.AUTH.REGISTER, data),

  login: (data) => baseApi.post(apiList.AUTH.LOGIN, data),

  logout: () => baseApi.post(apiList.AUTH.LOGOUT),

  getProfile: () => baseApi.get(apiList.AUTH.PROFILE),

  refreshToken: () => baseApi.post(apiList.AUTH.REFRESH),
};

export default authApi;
