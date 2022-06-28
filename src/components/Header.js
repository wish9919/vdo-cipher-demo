import {
  Avatar,
  Box,
  Flex,
  Heading,
  List,
  ListItem,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";

const Header = () => {
  return (
    <header>
      <Flex
        minWidth={"max-content"}
        backgroundColor={"teal.500"}
        paddingY={"2"}
        minHeight={"16"}
      >
        <Flex
          display="flex"
          alignItems={"center"}
          margin={"auto"}
          w="full"
          maxW={"6xl"}
        >
          <Heading color={"white"} size={"md"} as="h2">
            VdoCipher Demo
          </Heading>
          <Spacer />
          <Flex alignItems={"center"}>
            <Avatar size="sm" mr={"2"} cursor={"pointer"} />
            <Text color="white">Username</Text>
          </Flex>
        </Flex>
      </Flex>
    </header>
  );
};

export default Header;
