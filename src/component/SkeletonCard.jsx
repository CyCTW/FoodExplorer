import { Box, HStack, Skeleton, Stack, Text } from "@chakra-ui/react";

const SkeletonCard = () => {
  return (
    <Box w="80%" m={5}>
      <HStack>
        <Skeleton m={5}>
          <Box p={10}>fatty</Box>
        </Skeleton>
        <Stack>
          <Skeleton>
            <Box w="300px">won't be visible</Box>
          </Skeleton>
          <Skeleton mt={3}>
            <Box>won't be visible</Box>
          </Skeleton>
          <Skeleton mt={3}>
            <p>won't be visible</p>
          </Skeleton>
        </Stack>
      </HStack>
    </Box>
  );
};
export default SkeletonCard;
