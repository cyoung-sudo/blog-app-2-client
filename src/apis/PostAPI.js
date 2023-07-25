import api from "./configs/axiosConfig";

const PostAPI = {
  //----- Retrieve all posts
  getAll: async () => {
    const res = await api.request({
      method: "GET",
      url: "/api/posts"
    });

    return res;
  },

  //----- Create post
  create: async (userId, title, desc) => {
    const res = await api.request({
      method: "POST",
      data: {
        userId,
        title,
        desc
      },
      url: "/api/posts"
    });

    return res;
  },

  //----- Retrieve post
  getPost: async id => {
    const res = await api.request({
      method: "GET",
      url: `/api/posts/${ id }`
    });

    return res;
  },

  //----- Delete post
  deletePost: async id => {
    const res = await api.request({
      method: "DELETE",
      url: `/api/posts/${ id }`
    });

    return res;
  },

  //----- Retrieve all user posts
  getAllForUser: async userId => {
    const res = await api.request({
      method: "GET",
      url: `/api/posts/user/${ userId }`
    });

    return res;
  }
};

export default PostAPI;