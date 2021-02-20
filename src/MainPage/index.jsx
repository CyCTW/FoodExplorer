import { Box, Button, Flex, Heading, IconButton, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import githubLogo from "../icon/github-logo.png"
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
      <Flex>
        {/* <Image src={githubLogo} boxSize="30px" m={5}/> */}
        <IconButton icon={githubLogo}/>
      </Flex>
    </>
  );
};

export default MainPage;
