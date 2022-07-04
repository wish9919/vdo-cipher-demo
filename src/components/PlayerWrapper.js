/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { PlayerAPI } from "../data";
import VideoPlayer from "./VideoPlayer";

const PlayerWrapper = ({ videoId }) => {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [playerData, setPlayerData] = useState({
    otp: "",
    playbackInfo: "",
  });

  const loadVideo = async (id) => {
    setLoading(true);
    setCurrentVideo(videoId);

    // fetch playback info
    const result = await PlayerAPI.getOtp(id, {
      ip: "75.157.40.63",
      username: "username",
    });

    if (result.success) {
      setLoading(false);
      setPlayerData({
        otp: result.data.otp,
        playbackInfo: result.data.playbackInfo,
      });
    }
  };

  useEffect(() => {
    loadVideo(videoId);
  }, [videoId]);

  return (
    <>
      {loading && currentVideo && (
        <Flex justifyContent={"center"} alignItems="center" minH={300}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      )}
      {!loading && currentVideo && (
        <VideoPlayer
          otp={playerData.otp}
          playbackInfo={playerData.playbackInfo}
        />
      )}
    </>
  );
};

export default PlayerWrapper;
