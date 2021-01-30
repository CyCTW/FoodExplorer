import { Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <Flex direction="column" align="center">

      <Button as={Link} to="/signin" colorScheme="blue" mt={100} w="300px">
        Sign in
      </Button>
      <Button as={Link} to="/signup" m={5} w="300px">
        Sign up
      </Button>
    </Flex>
  );
};

export default LoginPage;
