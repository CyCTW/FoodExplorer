import { DeleteIcon, Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
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
      <HStack spacing="50px">
        <Text fontSize="6xl" fontFamily="">
          Food List
        </Text>
        <Menu>
          <MenuButton as={Button} colorScheme="cyan">
            Filter
          </MenuButton>
          <MenuList>
            <Stack>
              {Object.keys(placeInfo).map((category, idx) => {
                return <Checkbox p={3}>{category}</Checkbox>;
              })}
              <Checkbox p={3}>All</Checkbox>
            </Stack>
          </MenuList>
          
        </Menu>
      </HStack>
      {placeInfo &&
        Object.keys(placeInfo).map((category, idx) => {
          // if
          return (
            <Box key={idx} w="80%">
              <HStack>
                <Text fontSize="4xl">{category}</Text>
                <IconButton
                  onClick={() => handleDeleteCategory({ category })}
                  icon={<DeleteIcon />}
                />
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
