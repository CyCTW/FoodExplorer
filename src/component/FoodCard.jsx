import {
  Box,
  Flex,
  HStack,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon, StarIcon } from "@chakra-ui/icons";
const FoodCard = ({ mapResponse }) => {
  // photo, name, rating, address, isOpen, businessStatus,
  console.log(mapResponse);
  return (
    // <Flex direction="column" align="center">
    <Stack spacing="30px" align="center" mt={5}>
      <Image
        src={mapResponse.photos && mapResponse.photos[0].getUrl()}
        boxSize="300px"
        alt={mapResponse.name}
      />
      <Box>{mapResponse.name}</Box>
      <Box>
        <StarIcon mr={3} color="yellow.200" />
        {mapResponse.rating}
      </Box>
      <Box>{mapResponse.formatted_address}</Box>
      <HStack>
        {mapResponse.opening_hours.isOpen() ? (
          <Text color="green.500">Open now</Text>
        ) : (
          "Close now"
        )}
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton
                isActive={isOpen}
                as={Button}
                rightIcon={<ChevronDownIcon />}
              >
                {isOpen ? "Close" : "Opening Time"}
              </MenuButton>
              <MenuList>
                {mapResponse.opening_hours.weekday_text.map((item, idx) => {
                  return <MenuItem key={idx}>{item}</MenuItem>;
                })}
              </MenuList>
            </>
          )}
        </Menu>
      </HStack>

      {/* <Box>{mapResponse.opening_hours.weekday_text}</Box> */}
    </Stack>
  );
};
export default FoodCard;
