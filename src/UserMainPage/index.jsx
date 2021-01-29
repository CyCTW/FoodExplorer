import { Input, Flex, InputLeftElement, InputGroup } from "@chakra-ui/react";
import EmptyListPage from "./EmptyListPage";

const UserMainPage = () => {
  return (
    <Flex direction="column" align="center">
      <Input 
        w="md"
        m={5}
        rounded="xl"
        border="2px"
        borderColor="black.200"
        type="tel"
        placeholder="Search restaurant/place"
      />
      
      <EmptyListPage />
    </Flex>
  );
};

export default UserMainPage;
