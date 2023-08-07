import { api, baseURL } from "./configs/axiosConfig";

const UserAPI = {
  //----- Retrieve all users
  getAll: async () => {
    const res = await api.request({
      method: "GET",
      url: "/api/users",
      baseURL
    });

    return res;
  },

  //----- Create user
  create: async (username, password) => {
    const res = await api.request({
      method: "POST",
      data: {
        username,
        password
      },
      url: "/api/users",
      baseURL
    });

    return res;
  },

  //----- Retrieve user
  getUser: async id => {
    const res = await api.request({
      method: "GET",
      url: `/api/users/${ id }`,
      baseURL
    });

    return res;
  },

  //----- Delete user
  deleteUser: async id => {
    const res = await api.request({
      method: "DELETE",
      url: `/api/users/${ id }`,
      baseURL
    });

    return res;
  }
};

export default UserAPI;