import { ChevronDownIcon, ChevronUpIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import FoodCard from "./FoodCard";
import SkeletonCard from "./SkeletonCard";

const FoodList = ({
  foodlist,
  checkBoxState,
  checkAll,
  handleDeleteItem,
  handleDeleteCategory,
  handleChangeFilter,
  handleChangeAllFilter,
  placeInfo,
  setSelectedPlace,
}) => {
  console.log({ placeInfo });

  useEffect(() => {
    if (foodlist) {
      Object.keys(foodlist).map((category) => {
        setListState((state) => ({
          ...state,
          [category]: true,
        }));
      });
    }
  }, [foodlist]);
  const [listState, setListState] = useState({});
  console.log({ listState });
  const history = useHistory();
  let { url } = useRouteMatch();

  const handleClickCard = ({ placeInfo }) => {
    setSelectedPlace(placeInfo);
    history.push(`${url}/show/${placeInfo.placeId}`);
  };
  const handleClickCategory = ({ category }) => {
    console.log("Category", category);
    setListState((state) => ({
      ...state,
      [category]: !state[category],
    }));
  };

  return (
    <Flex direction="column" align="center" w="50%">
      <Box w="80%">
        <HStack spacing="50px">
          <Text fontSize="6xl" fontFamily="">
            Food List
          </Text>
          <Menu>
            <MenuButton as={Button} colorScheme="gray">
              Filter
            </MenuButton>
            <MenuList>
              <Stack>
                {foodlist &&
                  Object.keys(foodlist).map((category, idx) => {
                    return (
                      <Checkbox
                        p={3}
                        key={idx}
                        isChecked={
                          checkBoxState.hasOwnProperty(category) &&
                          checkBoxState[category]
                        }
                        onChange={(e) =>
                          handleChangeFilter({
                            status: e.target.checked,
                            category,
                          })
                        }
                      >
                        {category}
                      </Checkbox>
                    );
                  })}
                <Checkbox
                  p={3}
                  isChecked={checkAll}
                  defaultIsChecked
                  onChange={handleChangeAllFilter}
                >
                  All
                </Checkbox>
              </Stack>
            </MenuList>
          </Menu>
        </HStack>
      </Box>

      {Object.keys(placeInfo).length !== 0 ? (
        Object.keys(placeInfo).map((category, idx) => {
          if (checkBoxState[category]) {
            return (
              <Box key={idx} w="80%">
                <HStack>
                  <Box
                    m={5}
                    as={Button}
                    variant="unstyled"
                    onClick={() => handleClickCategory({ category })}
                  >
                    <HStack>
                      <Text fontSize="4xl">{category}</Text>

                      {listState[category] ? (
                        <ChevronUpIcon />
                      ) : (
                        <ChevronDownIcon />
                      )}
                    </HStack>
                  </Box>
                  <IconButton
                    onClick={() => handleDeleteCategory({ category })}
                    icon={<DeleteIcon />}
                  />
                </HStack>
                {placeInfo &&
                  listState[category] &&
                  placeInfo[category].map((place, idx) => {
                    return (
                      <FoodCard
                        key={idx}
                        index={idx}
                        placeInfo={place}
                        category={category}
                        handleDeleteItem={handleDeleteItem}
                        handleClickCard={handleClickCard}
                      />
                    );
                  })}
              </Box>
            );
          } else {
            return <></>;
          }
        })
      ) : (
        <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </>
      )}
    </Flex>
  );
};
export default FoodList;
