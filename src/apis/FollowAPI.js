import api from "./configs/axiosConfig";

const FollowAPI = {
  //----- Toggle follow
  toggle: async (followerId, followedId) => {
    const res = await api.request({
      method: "POST",
      data: {
        followerId,
        followedId
      },
      url: "/api/follows"
    });

    return res;
  },

  //----- Retrieve all user follows
  getForFollower: async userId => {
    const res = await api.request({
      method: "GET",
      url: `/api/follows/follower/${ userId }`
    });

    return res;
  },

  //----- Retrieve all user followers
  getForFollowed: async userId => {
    const res = await api.request({
      method: "GET",
      url: `/api/follows/followed/${ userId }`
    });

    return res;
  }
};

export default FollowAPI;