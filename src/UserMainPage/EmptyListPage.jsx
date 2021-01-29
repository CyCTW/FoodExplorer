import { Box, Button } from "@chakra-ui/react";

const EmptyListPage = () => {
  return (
    <>
      <Box m={8}>No restaurant has been added yet.</Box>
      <Button w="100px" sizes="lg" variant="outline" colorScheme="blue">Add</Button>
    </>
  );
};
export default EmptyListPage;
