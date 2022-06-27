import api from "./index";

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
    return api.post(`/videos/${id}`).then((res) => res.data);
  },
};

export default PlayerAPI;
