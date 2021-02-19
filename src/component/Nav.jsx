import {
  ChevronDownIcon,
  HamburgerIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import {
  Flex,
  HStack,
  Button,
  Image,
  IconButton,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Text,
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
    <Flex
      justify="space-between"
      bgColor="yellow.400"
      height="60px"
      style={{
        position: "fixed",
        width: "100%",
        top: 0,
        zIndex: "1",
      }}
    >
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
        <Menu mr={7}>
          <MenuButton
            as={IconButton}
            icon={<HamburgerIcon />}
            rightIcon={<ChevronDownIcon />}
            p={5}
            mr={3}
          />

          <MenuList>
            {isLogin && isLogin ? (
              <>
                <MenuItem as={Link} to="/account">
                  <Text fontSize="20px" fontFamily="sans-serif">Account</Text>
                </MenuItem>
                <MenuItem onClick={handleLogout && handleLogout}>
                  <Text fontSize="20px">Logout</Text>
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem as={Link} to="/signup">
                  <Text fontSize="20px">Signup</Text>
                </MenuItem>
                <MenuItem as={Link} to="/signin">
                  <Text fontSize="20px">Signin</Text>
                </MenuItem>
              </>
            )}
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};
export default Nav;
