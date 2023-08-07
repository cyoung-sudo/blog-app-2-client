import { api, baseURL } from "./configs/axiosConfig";

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
      url: "/api/comments",
      baseURL
    });

    return res;
  },

  //----- Retrieve all post comments
  getForPost: async postId => {
    const res = await api.request({
      method: "GET",
      url: `/api/comments/post/${ postId }`,
      baseURL
    });

    return res;
  },

  //----- Retrieve all user comments
  getAllForUser: async userId => {
    const res = await api.request({
      method: "GET",
      url: `/api/comments/user/${ userId }`,
      baseURL
    });

    return res;
  }
};

export default CommentAPI;