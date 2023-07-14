import api from "./configs/axiosConfig";

const LikeAPI = {
  //----- Toggle like
  toggle: async (userId, postId) => {
    const res = await api.request({
      method: "POST",
      data: {
        userId,
        postId
      },
      url: "/api/likes"
    });

    return res;
  },

  //----- Retrieve all post likes
  getAllForPost: async postId => {
    const res = await api.request({
      method: "GET",
      url: `/api/likes/post/${ postId }`
    });

    return res;
  },

  //----- Delete all post likes
  deleteAllForPost: async postId => {
    console.log("marker")
    const res = await api.request({
      method: "DELETE",
      url: `/api/likes/post/${ postId }`
    });

    return res;
  }
};

export default LikeAPI;