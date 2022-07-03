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
  getOtp: async (id) => {
    return api.post(`/videos/${id}/otp`).then((res) => res.data);
  },
  getVideo: async (id) => {
    return api.get(`/videos/${id}`).then((res) => res.data);
  },
  obtainUpload: async (title, folderId) => {
    const params = {
      title,
      folderId,
    };

    return api
      .put(`/videos`, undefined, {
        params,
      })
      .then((res) => res.data);
  },
};

export default PlayerAPI;
