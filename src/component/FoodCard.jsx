import { DeleteIcon, StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

const FoodCard = ({
  placeInfo,
  category,
  handleDeleteItem,
  handleClickCard,
}) => {
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

  const [UIState, setUIState] = useState("success");
  return (
    <Box
      border="2px solid #e8e8e8"
      borderRadius="10px"
      boxShadow="0px 5px 14px #adadad"
      bgColor="white"
      p={10}
      w={["50%", "100%"]}
      mt={5}
      as="button"
      onClick={() => handleClickCard({ placeInfo })}
    >
      <Flex justify="space-between" align="center">
        <HStack spacing="30px">
          <Image
            src={placeInfo && placeInfo.photos && placeInfo.photos[0].getUrl()}
            boxSize="100px"
            borderRadius="6px"
          />
          <Stack spacing="3px">
            <Text
              mb={2}
              fontFamily="Microsoft JhengHei"
              fontSize="xl"
              fontWeight="700"
              letterSpacing="2px"
              color="black"
            >
              {placeInfo && placeInfo.name}
            </Text>
            <HStack>
              <StarIcon color="#febc00" />
              <Text color="black">{placeInfo && placeInfo.rating}</Text>
            </HStack>

            {placeInfo && placeInfo.opening_hours && placeInfo.opening_hours.isOpen() ? (
              <Text textAlign="start" fontSize="md" color="green.400">
                Open Now
              </Text>
            ) : (
              <Text textAlign="start" fontSize="md" color="red.500">
                Close Now
              </Text>
              // <Text mb={2} fontFamily="Microsoft JhengHei" fontWeight="700" letterSpacing="2px">麵屋壹慶</Text>
            )}
            {/* Fix width */}
          </Stack>
        </HStack>
        <IconButton
          icon={<DeleteIcon />}
          isLoading={UIState === "loading"}
          onClick={(e) => {
            setUIState("loading");
            e.stopPropagation();
            handleDeleteItem({
              category,
              placeInfo,
              setCardUIState: setUIState,
            });
          }}
          variant="unstyled"
          color="#a3a3a3"
        />
      </Flex>
    </Box>
  );
};
export default FoodCard;
