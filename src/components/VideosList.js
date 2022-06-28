import { AddIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import PlayerAPI from "../data/PlayerAPI";
import { getStatus } from "../utils/getStatus";

const VideosList = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    PlayerAPI.getVideos().then((res) => {
      setLoading(false);
      setCount(res.data.count);
      setVideos(res.data.rows);
    });
  }, []);

  return (
    <Container paddingY={10} maxW={"6xl"}>
      <Flex flexDirection={"row"} justifyContent="space-between">
        <Heading size={"lg"} as="h3">
          Videos List
        </Heading>

        <Button leftIcon={<AddIcon />} colorScheme={"blue"} color="white">
          Add Video
        </Button>
      </Flex>
      <Flex mt={4}>
        {loading ? (
          <Skeleton startColor="gray.50" endColor="gray.100" h={4} w={10} />
        ) : (
          <Text>Count: {count}</Text>
        )}
      </Flex>
      {loading && (
        <Grid
          templateColumns={["repeat(2, 1fr)", "repeat(4, 1fr)"]}
          gap={6}
          marginTop={8}
        >
          <GridItem as={"div"}>
            <Skeleton
              startColor="gray.50"
              endColor="gray.100"
              minHeight={300}
            />
          </GridItem>
          <GridItem as={"div"}>
            <Skeleton
              startColor="gray.50"
              endColor="gray.100"
              minHeight={300}
            />
          </GridItem>
          <GridItem as={"div"}>
            <Skeleton
              startColor="gray.50"
              endColor="gray.100"
              minHeight={300}
            />
          </GridItem>
        </Grid>
      )}
      {!loading && (
        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(4, 1fr)",
          ]}
          gap={6}
          marginTop={8}
        >
          {videos.map((item, i) => {
            return (
              <GridItem as={"div"} key={item.id}>
                <Box
                  bg={"gray.50"}
                  minHeight={300}
                  cursor={"pointer"}
                  _hover={{ boxShadow: "lg" }}
                  transition="all 0.3s ease-in-out"
                  borderWidth={1}
                  borderColor={"gray.100"}
                >
                  <Image
                    objectFit="cover"
                    height={200}
                    src={item.poster}
                    alt={item.title}
                  />
                  <Box p={4}>
                    <Heading as={"h6"} size="sm">
                      {item.title}
                    </Heading>
                    <Badge mt={2} colorScheme={getStatus(item.status).color}>
                      {getStatus(item.status).title}
                    </Badge>
                  </Box>
                </Box>
              </GridItem>
            );
          })}
        </Grid>
      )}
    </Container>
  );
};

export default VideosList;
