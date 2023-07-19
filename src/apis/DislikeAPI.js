import api from "./configs/axiosConfig";

const DislikeAPI = {
  //----- Toggle dislike
  toggle: async (userId, postId) => {
    const res = await api.request({
      method: "POST",
      data: {
        userId,
        postId
      },
      url: "/api/dislikes"
    });

    return res;
  },

  //----- Retrieve all post dislikes
  getAllForPost: async postId => {
    const res = await api.request({
      method: "GET",
      url: `/api/dislikes/post/${ postId }`
    });

    return res;
  },
  
  //----- Delete all post dislikes
  deleteAllForPost: async postId => {
    const res = await api.request({
      method: "DELETE",
      url: `/api/dislikes/post/${ postId }`
    });

    return res;
  },

  //----- Retrieve all user dislikes
  getAllForUser: async userId => {
    const res = await api.request({
      method: "GET",
      url: `/api/dislikes/user/${ userId }`
    });

    return res;
  },

  //----- Delete all user dislikes
  deleteAllForUser: async userId => {
    const res = await api.request({
      method: "DELETE",
      url: `/api/dislikes/user/${ userId }`
    });

    return res;
  }
};

export default DislikeAPI;