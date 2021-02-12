import { Button, Flex, HStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getPlaceDetails } from "../utils";
import FoodCard from "./FoodCard";

const FoodList = ({
  foodlist,
  email,
  handleDeleteItem,
  handleDeleteCategory,
  placeInfo
}) => {

  console.log({placeInfo})
  let foodIdx = -1;

  return (
    <Flex direction="column" align="center">
      <Text fontSize="6xl">Your Food List</Text>
      {placeInfo &&
        Object.keys(placeInfo).map((category, idx) => {
          return (
            <div key={idx}>
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
              {placeInfo && placeInfo[category].map((place, idx) => {
                foodIdx += 1;
                return (
                  <HStack m={5} key={idx}>
                    <FoodCard placeInfo={place}/>

                    <Button
                      colorScheme="red"
                      size="xs"
                      onClick={() => handleDeleteItem({ category, place })}
                    >
                      Delete
                    </Button>
                  </HStack>
                );
              })}
            </div>
          );
        })}
    </Flex>
  );
};
export default FoodList;
