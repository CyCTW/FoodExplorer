import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import githubLogo from "../icon/github-logo.png";
import youtubeLogo from "../icon/youtube.png";

import BannerImage from "../icon/banner.jpg";
const MainPage = () => {
  return (
    <>
      <Flex
        style={{
          backgroundImage: `url(${BannerImage})`,
          backgroundSize: "100% 100vh",
          backgroundRepeat: "no-repeat",
        }}
        w="100%"
        h="100vh"
        direction="column"
        align="center"
        justify="center"
      >
        <Heading size="4xl" as="h1" color="white" m={6}>
          Food Explorer
        </Heading>
        <Button
          as={Link}
          to="/signup"
          variant="solid"
          // colorScheme="blue"
          p="25px"
          bgColor="#febc00"
          color="black"
          borderRadius="10px"
        >
          Start building
        </Button>
      </Flex>
      <Flex justify="flex-end" h="100px">
        {/* <Image src={githubLogo} boxSize="30px" m={5}/> */}
        <Button variant="unstyled" m={5}>
          <Image src={githubLogo} boxSize="30px" onClick={
            () => {
              window.open("https://github.com/CyCTW/FoodExplorer")
            }
          }/>
        </Button>
        <Button variant="unstyled" m={5}>
          <Image src={youtubeLogo} boxSize="30px" onClick={
            () => {
              window.open("https://youtu.be/Cu9txd9VsfQ")
            }
          }/>
        </Button>
      </Flex>
    </>
  );
};

export default MainPage;
