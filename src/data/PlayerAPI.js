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
  getOtp: async (id, { ip, username }) => {
    return api
      .post(
        `/videos/${id}/otp`,
        {
          annotate: JSON.stringify([
            {
              type: "rtext",
              text: username,
              alpha: "0.8",
              color: "0xFF0000",
              size: "15",
              interval: "5000",
            },
            {
              type: "rtext",
              text: ip,
              alpha: "0.8",
              color: "0xFF0000",
              size: "15",
              interval: "5000",
            },
          ]),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => res.data);
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
