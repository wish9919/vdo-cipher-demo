import {
  Button,
  Flex,
  Heading,
  Input,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

const LoginPage = () => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");
  return (
    <>
      <Flex
        justifyContent={"center"}
        alignItems="center"
        minH={"100vh"}
        height={"100vh"}
      >
        <Flex
          direction={"column"}
          minW="sm"
          borderRadius={6}
          p={10}
          bg={formBackground}
        >
          <Heading size="lg" mb={6}>
            Log in
          </Heading>

          <Input
            bg="gray.200"
            variant={"filled"}
            type="email"
            placeholder="hello@example.com"
            mb={4}
          />
          <Input
            bg="gray.200"
            variant={"filled"}
            mb={6}
            type="password"
            placeholder="***********"
          />

          <Button mb="6" colorScheme={"teal"}>
            Login
          </Button>
          <Button onClick={toggleColorMode}>Toggle Color Mode</Button>
        </Flex>
      </Flex>
    </>
  );
};

export default LoginPage;
