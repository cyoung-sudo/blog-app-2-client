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
  }
};

export default PostAPI;