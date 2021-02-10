import { Button, Flex, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { deleteCategory, updateNewFood } from "../utils";

const FoodList = ({ foodlist, email }) => {
  const [category, setCategory] = useState();

  const handleDelete = async () => {
    await updateNewFood({ email, category, originFoodnames: [] });
  };

  return (
    <Flex direction="column" align="center">
      <Text fontSize="6xl">Your Food List</Text>
      {foodlist &&
        Object.keys(foodlist).map((item, idx) => {
          return (
            <div key={idx}>
              <HStack>
                <Text fontSize="4xl">{item}</Text>
                <Button
                  colorScheme="red"
                  size="xs"
                  onClick={async () => {
                    console.log("Click!");
                    await deleteCategory({
                      email,
                      category: item,
                    });
                  }}
                >
                  Delete
                </Button>
              </HStack>
              {foodlist[item].map((food) => {
                return (
                  <HStack m={5}>
                    <Text>{food}</Text>;
                    <Button
                      colorScheme="red"
                      size="xs"
                      onClick={async () => {
                        console.log("Click!");
                        await updateNewFood({
                          email,
                          category: item,
                          originFoodnames: foodlist[item].filter(
                            (value, idx, arr) => {
                              return value != food;
                            }
                          ),
                        });
                      }}
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
