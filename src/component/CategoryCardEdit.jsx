import { Button, Center, Flex, Stack } from "@chakra-ui/react";

const CategoryCardEdit = () => {
  return (
    <Center mt={9}>
      <Stack w="300px">
        <Button colorScheme="blue">Direction</Button>
        <Button mt={5} colorScheme="red" variant="outline">Remove from list</Button>
      </Stack>
    </Center>
  );
};
export default CategoryCardEdit;
