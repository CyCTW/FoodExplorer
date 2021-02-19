import { StarIcon } from "@chakra-ui/icons";
import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";

const PlaceCard = ({ placeInfo, handleClickPlaceCard }) => {
  return (
    <Box
      border="3px solid"
      borderRadius="10px"
      p={7}
      w="200px"
      as="button"
      color="white"
      bgColor="black"
      style={{opacity: "0.8"}}
      onClick={() => handleClickPlaceCard({ placeInfo })}
    >
      <Flex justify="space-between" align="center">
        <Stack spacing="3px">
          <Text fontSize="20px">{placeInfo && placeInfo.name}</Text>
          <HStack>
            <StarIcon mr={3} color="yellow.200" />
            <Text>{placeInfo && placeInfo.rating}</Text>
          </HStack>
          {placeInfo && placeInfo.opening_hours.isOpen() ? (
            <Text color="green.200">Open now</Text>
          ) : (
            <Text color="red.500">Close</Text>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};

export default PlaceCard;
