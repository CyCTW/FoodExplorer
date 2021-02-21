import {
  Box,
  HStack,
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
  Flex,
} from "@chakra-ui/react";
import {
  ArrowBackIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DeleteIcon,
  LinkIcon,
  StarIcon,
} from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import CategoryCardEdit from "./CategoryCardEdit";
import CategoryCard from "./CategoryCard";
import { useHistory } from "react-router-dom";
const FoodInfo = ({
  mapResponse,
  isSave,
  foodlist,
  email,
  removeCard,
  placeInfo,
}) => {
  // photo, name, rating, address, isOpen, businessStatus,
  const [photoIdx, setPhotoIdx] = useState(0);

  useEffect(() => {
    setPhotoIdx(0);
  }, [mapResponse]);
  //   const photoLength = mapResponse.photos.length;

  const [menuOpen, setMenuOpen] = useState(false);
  const history = useHistory();
  
  return (
    <>
      <div
        style={{
          position: "fixed",
          borderLeft: "2px solid #cfcfcf",
          left: "50%",
          height: "60vh",
        }}
      ></div>
      <IconButton
        icon={<ArrowBackIcon />}
        variant="unstyled"
        size="lg"
        w="30px"
        onClick={() => {
          history.push(`/`);
        }}
        style={{ position: "fixed", top: "50px"}}
      />

      <Flex justify="space-evenly" mt="100px" align="start">
        <Flex direction="column" mt={5}>
          <Text fontSize="30px" fontWeight="700" letterSpacing="2px">
            {mapResponse && mapResponse.name && mapResponse.name}
          </Text>
          <Box>
            <StarIcon mr={3} color="#febc00" />
            {mapResponse && mapResponse.rating && mapResponse.rating}
          </Box>

          <Stack mt="40px">
            {mapResponse && mapResponse.isOpen ? (
              <Text color="green.500">Open now</Text>
            ) : (
              <Text color="red.500">Close now</Text>
            )}
            <Stack>
              <Box
                as={Button}
                variant="unstyled"
                textAlign="start"
                rightIcon={<ChevronDownIcon />}
                onClick={() => setMenuOpen((state) => !state)}
                fontWeight="500"
                color="#a3a3a3"
                heightModify
              >
                Opening Time
              </Box>
              <Stack>
                {mapResponse && mapResponse.weekday &&
                  menuOpen &&
                  mapResponse.weekday.map((item, idx) => {
                    return <Box key={idx}>{item}</Box>;
                  })}
              </Stack>
            </Stack>
          </Stack>
          <Box mt="40px">
            {mapResponse && mapResponse.formatted_address && mapResponse.formatted_address}
          </Box>
          {isSave ? (
            <CategoryCardEdit removeCard={removeCard} placeInfo={placeInfo} />
          ) : (
            <CategoryCard foodlist={foodlist} email={email} />
          )}
        </Flex>
        {/* add vertical line */}
        <HStack>
          <IconButton
            colorScheme="cyan"
            onClick={() => {
              if (photoIdx > 0) {
                setPhotoIdx((idx) => idx - 1);
              }
            }}
            bgColor="black"
            color="white"
            _hover={{
              bgColor: "gray.400",
            }}
            icon={<ChevronLeftIcon />}
          />
          <Image
            src={mapResponse && mapResponse.photos && mapResponse.photos[photoIdx].getUrl()}
            fallback={
              <Center as={Box} boxSize="300px">
                <Spinner size="xl" />
              </Center>
            }
            borderRadius="10px"
            boxSize="500px"
            alt={"Loading..."}
          />
          <IconButton
            colorScheme="cyan"
            onClick={() => {
              if (
                mapResponse.photos &&
                photoIdx + 1 < mapResponse.photos.length
              ) {
                setPhotoIdx((idx) => idx + 1);
              }
            }}
            _hover={{
              bgColor: "gray.400",
            }}
            bgColor="black"
            color="white"
            icon={<ChevronRightIcon />}
          />
        </HStack>
      </Flex>
    </>
  );
};
export default FoodInfo;
