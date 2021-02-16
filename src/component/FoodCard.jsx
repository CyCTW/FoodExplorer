import { DeleteIcon, StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

const FoodCard = ({ placeInfo, category, handleDeleteItem }) => {
  /* placeInfo: 
    - formatted_address
    - formatted_phone_number
    - geometry
    - name
    - opening_hours
    - photos
    - rating
    - 
    */

  console.log(placeInfo);
  return (
    <Box
      border="3px solid"
      borderRadius="10px"
      p={10}
      w={["50%", "100%"]}
      mt={5}
      as="button"
    >
      <Flex justify="space-between" align="center">
        <HStack spacing="30px">
          <Image
            src={placeInfo && placeInfo.photos && placeInfo.photos[0].getUrl()}
            boxSize="100px"
          />
          <Stack spacing="3px">
            <Text>{placeInfo && placeInfo.name}</Text>
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
        </HStack>
        <IconButton
          icon={<DeleteIcon />}
          onClick={() => handleDeleteItem({ category, placeInfo })}
        />
      </Flex>
    </Box>
  );
};
export default FoodCard;
