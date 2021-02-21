import { Box, Button, Flex, HStack, Image, Stack } from "@chakra-ui/react";
import Searchicon from "../icon/search.png"

const EmptyListPage = () => {
  return (
    <Flex direction="column" align="center">
      <Image src={Searchicon} mt="80px"/>
      <Box color="#a3a3a3" fontSize="20px" mt={8}>No restaurant has been added yet.</Box>
      <Box color="#a3a3a3" fontSize="20px" >Start adding with the search bar above.</Box>
    </Flex>
  );
};
export default EmptyListPage;
