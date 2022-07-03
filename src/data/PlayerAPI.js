import api from "../utils/axios";

const PlayerAPI = {
  getVideos: async (page, limit) => {
    return api
      .get("/videos", {
        params: {
          page,
          limit,
        },
      })
      .then((res) => res.data);
  },
  getVideo: async (id) => {
    return api.get(`/videos/${id}`).then((res) => res.data);
  },
};

export default PlayerAPI;
