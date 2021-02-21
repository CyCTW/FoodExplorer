import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import githubLogo from "../icon/github-logo.png";
import youtubeLogo from "../icon/youtube.png";
import linkedinLogo from "../icon/linkedin.png"
import facebookLogo from "../icon/facebook-circular-logo.png"

import BannerImage from "../icon/banner.jpg";
const MainPage = () => {
  return (
    <>
      <Flex
        style={{
          backgroundImage: `url(${BannerImage})`,
          backgroundSize: "100% auto",
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
      <Center mt={5}>Made by Matt Chang</Center>
      <Flex justify="center" h="100px">
        {/* <Box>
          <Text m={7} fontWeight="700">Contact Author:</Text>
        </Box> */}
        <Button variant="unstyled" m={2}>
          <Image
            src={linkedinLogo}
            boxSize="20px"
            onClick={() => {
              window.open("https://www.linkedin.com/in/cyctw/");
            }}
          />
        </Button>
        <Button variant="unstyled" m={2}>
          <Image
            src={facebookLogo}
            boxSize="20px"
            onClick={() => {
              window.open("https://www.facebook.com/NCTU193/");
            }}
          />
        </Button>

        <Button variant="unstyled" m={2}>
          <Image
            src={githubLogo}
            boxSize="20px"
            onClick={() => {
              window.open("https://github.com/CyCTW/FoodExplorer");
            }}
          />
        </Button>
        <Button variant="unstyled" m={2}>
          <Image
            src={youtubeLogo}
            boxSize="20px"
            onClick={() => {
              window.open("https://youtu.be/Cu9txd9VsfQ");
            }}
          />
        </Button>
      </Flex>
    </>
  );
};

export default MainPage;
