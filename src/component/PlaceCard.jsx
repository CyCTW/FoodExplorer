import { StarIcon } from "@chakra-ui/icons";
import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";

const PlaceCard = ({ placeInfo, handleClickPlaceCard }) => {
  return (
    <Box
      border="3px solid"
      borderRadius="10px"
      p={5}
      w="200px"
      as="button"
      color="white"
      bgColor="black"
      style={{zIndex: "4"}}
      onClick={() => handleClickPlaceCard({ placeInfo })}
    >
      <Flex justify="space-between" align="center">
        <Stack spacing="3px">

          <Text mb={2} fontSize="20px" letterSpacing="2px" fontWeight="700">{placeInfo && placeInfo.name}</Text>
          <HStack>
            <StarIcon color="#febc00" />
            <Text>{placeInfo && placeInfo.rating}</Text>
          </HStack>
          {placeInfo && placeInfo.opening_hours.isOpen() ? (
            <Text textAlign="start" fontSize="sm" color="green.400">Open now</Text>
          ) : (
            <Text textAlign="start" fontSize="sm" color="red.500">Close</Text>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};

export default PlaceCard;
