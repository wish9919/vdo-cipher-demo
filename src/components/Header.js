import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Flex,
  Heading,
  Spacer,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

const Header = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const navBg = useColorModeValue("gray.200", "gray.700");
  return (
    <header>
      <Flex
        minWidth={"max-content"}
        backgroundColor={navBg}
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
          <Heading size={"md"} as="h2">
            VdoCipher Demo
          </Heading>
          <Spacer />

          <Button
            display={"flex"}
            cursor={"pointer"}
            transition={"all 0.2s ease"}
            borderRadius={10}
            alignItems={"center"}
            mr={3}
          >
            <Avatar size="sm" mr={"2"} cursor={"pointer"} />
            <Text>Username</Text>
          </Button>
          <Button colorScheme={"gray"} onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>
      </Flex>
    </header>
  );
};

export default Header;
