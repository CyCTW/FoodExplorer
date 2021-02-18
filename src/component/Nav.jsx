import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  HStack,
  Button,
  Image,
  IconButton,
  useColorMode,
  Switch,
} from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import Logo from "../icon/logo_transparent.png";
import { AuthLogout } from "./Auth";
const Nav = ({ isLogin, setIsLogin }) => {
  const history = useHistory();
  const handleLogout = () => {
    AuthLogout()
      .then((resp) => {
        setIsLogin(false);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex justify="space-between" bgColor="yellow.400" height="60px" style={{
      position: "fixed",
      width: "100%", 
      top: 0
      }}>
      <HStack>
        <IconButton
          variant="link"
          m={5}
          icon={<Image src={Logo} width="100px" height="40px" />}
          bgColor="yellow.400"
          as={Link}
          to="/"
        />
      </HStack>
      <HStack space="20px">
        <IconButton
          mr={[2, 3, 4]}
          aria-label="colorModeIcon"
          variant="unstyled"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          bgColor="none"
        ></IconButton>
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
