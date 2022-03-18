import { ChevronDownIcon, ChevronUpIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
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
import EmptyListPage from "../UserMainPage/EmptyListPage";
import FoodCard from "./FoodCard";
import SkeletonCard from "./SkeletonCard";

const FoodList = ({
  foodlist,
  emptyList,
  checkBoxState,
  checkAll,
  handleDeleteItem,
  handleDeleteCategory,
  handleChangeFilter,
  handleChangeAllFilter,
  placeInfo,
  setSelectedPlace,
  FoodListUIState,
}) => {

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
  const history = useHistory();
  let { url } = useRouteMatch();

  const handleClickCard = ({ placeInfo }) => {
    placeInfo["weekday"] = placeInfo.opening_hours && placeInfo.opening_hours.weekday_text;
    setSelectedPlace(placeInfo);
    history.push(`${url}/show/${placeInfo.placeId}`);
  };
  const handleClickCategory = ({ category }) => {
    setListState((state) => ({
      ...state,
      [category]: !state[category],
    }));
  };

  const [UIState, setUIState] = useState({});

  return (
    <Flex direction="column" align="center" w="50%" pt="70px" h="100vh">
      <Box w="80%">
        <HStack spacing="50px">
          <Heading size="2xl">FOOD LIST</Heading>
          <Menu>
            <MenuButton as={Button} variant="outline" bgColor="#febc00">
              Filter
            </MenuButton>
            <MenuList>
              <Stack>
                {foodlist &&
                  Object.keys(foodlist).map((category, idx) => {
                    return (
                      <Checkbox
                        p={3}
                        iconColor="white"
                        colorScheme="gray"
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
                  iconColor="white"
                  colorScheme="gray"
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

      {Object.keys(placeInfo).length !== 0 && FoodListUIState === "finish" ? (
        Object.keys(placeInfo).map((category, idx) => {
          if (checkBoxState[category]) {
            return (
              <Box key={idx} w="80%">
                <HStack mt="30px">
                  <Box
                    as={Button}
                    variant="unstyled"
                    onClick={() => handleClickCategory({ category })}
                  >
                    <HStack>
                      <Text fontFamily="Roboto" fontSize="lg">
                        {category}
                      </Text>

                      {listState[category] ? (
                        <ChevronUpIcon />
                      ) : (
                        <ChevronDownIcon />
                      )}
                    </HStack>
                  </Box>
                  <IconButton
                    isLoading={idx in UIState && UIState[idx] === "loading"}
                    onClick={() => {
                      setUIState({ ...UIState, [idx]: "loading" });
                      handleDeleteCategory({
                        category,
                        setCardUIState: setUIState,
                        idx,
                      });
                    }}
                    icon={<DeleteIcon />}
                    variant="unstyled"
                    color="#a3a3a3"
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
      ) : emptyList ? (
        <EmptyListPage />
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
