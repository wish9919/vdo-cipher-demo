import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";

import { PlayerAPI } from "../data";
import { getStatus } from "../utils/getStatus";

const SingleVideo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    PlayerAPI.getVideo(id)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data) {
          setError({
            message: err.response.data.message,
          });
        } else {
          setError({
            message: "Something went wrong!",
          });
        }
        setLoading(false);
      });
  }, [id]);

  if (error) {
    return (
      <Layout>
        <Container paddingY={10} maxW="6xl">
          <Heading textAlign={"center"} size={"lg"}>
            {error.message}
          </Heading>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container paddingY={10} maxW={"6xl"}>
        <Button
          onClick={() => navigate("/")}
          leftIcon={<ArrowBackIcon />}
          mb={4}
        >
          Go back
        </Button>

        <Flex justifyContent={"space-between"} alignItems="start">
          <Box>
            {/* Heading  */}
            {!loading ? (
              <Heading>{data.title}</Heading>
            ) : (
              <Skeleton borderRadius={10} height={30} width={500} />
            )}

            {!loading && (
              <Flex mt={2}>
                {data.tags.map((tag, i) => (
                  <Badge key={i} colorScheme={"blue"} mr={1}>
                    {tag}
                  </Badge>
                ))}
              </Flex>
            )}
            {!loading && (
              <Text mt={1} color={"gray.500"}>
                {data.length} mins
              </Text>
            )}
          </Box>

          {!loading && (
            <Box>
              <Badge colorScheme={getStatus(data.status).color} fontSize="18px">
                {getStatus(data.status).title}
              </Badge>
            </Box>
          )}
        </Flex>

        {/* Poster */}
        {!loading ? (
          <Box mt={5}>
            <Image
              alt="Video Cover"
              borderRadius={10}
              width={"100%"}
              src={data.poster}
            />
          </Box>
        ) : (
          <Skeleton borderRadius={10} mt={5} height={300} />
        )}

        <Box mt={5}>
          {!loading ? (
            <>
              {data.status === "PRE-Upload" && (
                <Alert borderRadius={10} status="warning">
                  <AlertIcon />
                  Video not uploaded, you need to upload the video
                </Alert>
              )}

              <Heading mt={4} color={"slategray"} size={"sm"}>
                Description
              </Heading>
              <Text>{data.description}</Text>
            </>
          ) : (
            <Skeleton borderRadius={10} width={"100%"} height={25} />
          )}
        </Box>
      </Container>
    </Layout>
  );
};

export default SingleVideo;
