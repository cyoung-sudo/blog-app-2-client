import { api, baseURL } from "./configs/axiosConfig";

const FollowAPI = {
  //----- Toggle follow
  toggle: async (followerId, followedId) => {
    const res = await api.request({
      method: "POST",
      data: {
        followerId,
        followedId
      },
      url: "/api/follows",
      baseURL
    });

    return res;
  },

  //----- Retrieve all user follows
  getForFollower: async userId => {
    const res = await api.request({
      method: "GET",
      url: `/api/follows/follower/${ userId }`,
      baseURL
    });

    return res;
  },

  //----- Retrieve all user followers
  getForFollowed: async userId => {
    const res = await api.request({
      method: "GET",
      url: `/api/follows/followed/${ userId }`,
      baseURL
    });

    return res;
  }
};

export default FollowAPI;