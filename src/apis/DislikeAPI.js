import { api, baseURL } from "./configs/axiosConfig";

const DislikeAPI = {
  //----- Toggle dislike
  toggle: async (userId, postId) => {
    const res = await api.request({
      method: "POST",
      data: {
        userId,
        postId
      },
      url: "/api/dislikes",
      baseURL
    });

    return res;
  },

  //----- Retrieve all post dislikes
  getAllForPost: async postId => {
    const res = await api.request({
      method: "GET",
      url: `/api/dislikes/post/${ postId }`,
      baseURL
    });

    return res;
  },

  //----- Retrieve all user dislikes
  getAllForUser: async userId => {
    const res = await api.request({
      method: "GET",
      url: `/api/dislikes/user/${ userId }`,
      baseURL
    });

    return res;
  }
};

export default DislikeAPI;