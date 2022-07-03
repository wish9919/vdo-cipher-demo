import { ArrowBackIcon } from "@chakra-ui/icons";
import {
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

const SingleVideo = (props) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    PlayerAPI.getVideo(id)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

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
            <Badge colorScheme={getStatus(data.status).color} fontSize="18px">
              {getStatus(data.status).title}
            </Badge>
          )}
        </Flex>

        {/* Poster */}
        {!loading ? (
          <Box mt={5}>
            <Image borderRadius={10} width={"100%"} src={data.poster} />
          </Box>
        ) : (
          <Skeleton borderRadius={10} mt={5} height={300} />
        )}

        <Box mt={5}>
          {!loading ? (
            <>
              <Heading color={"slategray"} size={"sm"}>
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
