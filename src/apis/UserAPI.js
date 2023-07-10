import api from "./configs/axiosConfig";

const UserAPI = {
  //----- Retrieve all users
  getAll: async () => {
    const res = await api.request({
      method: "GET",
      url: "/api/users"
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
      url: "/api/users"
    });

    return res;
  },

  //----- Retrieve user
  getUser: async id => {
    const res = await api.request({
      method: "GET",
      url: `/api/users/${ id }`
    });

    return res;
  }
};

export default UserAPI;