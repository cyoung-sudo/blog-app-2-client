import api from "./configs/axiosConfig";

const AuthAPI = {
  //----- Login user
  login: async (username, password) => {
    const res = await api.request({
      method: "POST",
      data: {
        username,
        password
      },
      url: "/api/auth/login"
    });

    return res;
  },

  //----- Logout user
  logout: async () => {
    const res = await api.request({
      method: "DELETE",
      url: "/api/auth/logout"
    });

    return res;
  },

  //----- Retrieve authenticated user if possible
  getAuthUser: async () => {
    const res = await api.request({
      method: "GET",
      url: "/api/auth/authUser"
    });

    return res;
  }
};

export default AuthAPI;