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
  IconButton,
  Spinner,
  Center,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@chakra-ui/icons";
import { useEffect, useState } from "react";
const FoodInfo = ({ mapResponse }) => {
  // photo, name, rating, address, isOpen, businessStatus,
  console.log(mapResponse);
  const [photoIdx, setPhotoIdx] = useState(0);

  useEffect(() => {
    setPhotoIdx(0);
  }, [mapResponse]);
  //   const photoLength = mapResponse.photos.length;
  console.log(photoIdx);
  return (
    // <Flex direction="column" align="center">
    <Stack spacing="30px" align="center" mt={5}>
      <HStack>
        <IconButton
          colorScheme="cyan"
          onClick={() => {
            if (photoIdx > 0) {
              setPhotoIdx((idx) => idx - 1);
            }
          }}
          icon={<ChevronLeftIcon />}
        />

        <Image
          src={mapResponse.photos && mapResponse.photos[photoIdx].getUrl()}
          fallback={
            <Center as={Box} boxSize="300px">
              <Spinner size="xl" />
            </Center>
          }
          boxSize="300px"
          alt={"Loading..."}
        />
        <IconButton
          colorScheme="cyan"
          onClick={() => {
            if (mapResponse.photos && photoIdx + 1 < mapResponse.photos.length) {
              setPhotoIdx((idx) => idx + 1);
            }
          }}
          icon={<ChevronRightIcon />}
        />
      </HStack>
      <Box>{mapResponse.name && mapResponse.name}</Box>
      <Box>
        <StarIcon mr={3} color="yellow.200" />
        {mapResponse.rating && mapResponse.rating}
      </Box>
      <Box>
        {mapResponse.formatted_address && mapResponse.formatted_address}
      </Box>
      <HStack>
        {mapResponse.isOpen ? (
          <Text color="green.500">Open now</Text>
        ) : (
          <Text color="red.500">Close now</Text>
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
                {mapResponse.weekday &&
                  mapResponse.weekday.map((item, idx) => {
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
export default FoodInfo;
