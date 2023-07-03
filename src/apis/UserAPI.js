import api from "./configs/axiosConfig";

const UserAPI = {
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
  }
};

export default UserAPI;