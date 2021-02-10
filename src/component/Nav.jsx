import { Box, Flex, HStack, Button, Image, IconButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Logo from "../icon/logo_transparent.png";
const Nav = ({ isLogin, handleLogout }) => {
  return (
    <Flex justify="space-between" bgColor="red.200" height="50px" mb={10}>
      <HStack>
        <IconButton
          variant="link"
          m={5}
          icon={<Image src={Logo} width="100px" height="40px" />}
          bgColor="red.200"
          as={Link}
          to="/"
        />
      </HStack>
      <HStack space="20px">
        {isLogin && isLogin ? (
          <>
            <Button colorScheme="red" onClick={handleLogout && handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button colorScheme="blue" as={Link} to="/signup">
              Signup
            </Button>
            <Button colorScheme="yellow" as={Link} to="/signin">
              Signin
            </Button>
          </>
        )}
      </HStack>
    </Flex>
  );
};
export default Nav;
