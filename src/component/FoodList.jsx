import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getPlaceDetails } from "../utils";
import FoodCard from "./FoodCard";

const FoodList = ({
  foodlist,
  email,
  handleDeleteItem,
  handleDeleteCategory,
  placeInfo,
}) => {
  console.log({ placeInfo });
  let foodIdx = -1;

  return (
    <Flex direction="column" align="center" w="50%">
      <Text fontSize="6xl" fontFamily="">
        Food List
      </Text>
      {placeInfo &&
        Object.keys(placeInfo).map((category, idx) => {
          return (
            <Box key={idx} w="80%">
              <HStack>
                <Text fontSize="4xl">{category}</Text>
                <Button
                  colorScheme="red"
                  size="xs"
                  onClick={() => handleDeleteCategory({ category })}
                >
                  Delete
                </Button>
              </HStack>
              {placeInfo &&
                placeInfo[category].map((place, idx) => {
                  foodIdx += 1;
                  return (
                    <FoodCard
                      key={idx}
                      placeInfo={place}
                      category={category}
                      handleDeleteItem={handleDeleteItem}
                    />
                  );
                })}
            </Box>
          );
        })}
    </Flex>
  );
};
export default FoodList;
