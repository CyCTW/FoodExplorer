import { Box, Flex, HStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <Flex justify="space-between" bgColor="red.200" height="50px" mb={10}>
      <HStack>
        <Button as={Link} to="/">Logo</Button>
      </HStack>
      <HStack space="20px">
        <Button colorScheme="blue" as={Link} to="/signup">Signup</Button>
        <Button colorScheme="yellow" as={Link} to="/signin">Signin</Button>
      </HStack>
    </Flex>
  );
};
export default Nav;
