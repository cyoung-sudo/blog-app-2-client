import api from "./configs/axiosConfig";

const CommentAPI = {
  //----- Create comment
  create: async (userId, postId, text) => {
    const res = await api.request({
      method: "POST",
      data: {
        userId,
        postId,
        text
      },
      url: "/api/comments"
    });

    return res;
  },

  //----- Retrieve all post comments
  getForPost: async postId => {
    const res = await api.request({
      method: "GET",
      url: `/api/comments/post/${ postId }`
    });

    return res;
  },

  //----- Delete all post comments
  deleteAllForPost: async postId => {
    const res = await api.request({
      method: "DELETE",
      url: `/api/comments/post/${ postId }`
    });

    return res;
  },

  //----- Retrieve all user comments
  getAllForUser: async userId => {
    const res = await api.request({
      method: "GET",
      url: `/api/comments/user/${ userId }`
    });

    return res;
  },

  //----- Delete all user comments
  deleteAllForUser: async userId => {
    const res = await api.request({
      method: "DELETE",
      url: `/api/comments/user/${ userId }`
    });

    return res;
  }
};

export default CommentAPI;