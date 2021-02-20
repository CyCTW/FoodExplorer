import { Center, Flex, Stack, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import {
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import CategoryCard from "../component/CategoryCard";
import FoodMap from "../component/FoodMap";
import SearchBox from "../component/SearchBox";
// import FoodList from "../component/FoodList";
import {
  deleteCategory,
  getPlaceDetails,
  getUserFoodList,
  updateNewFood,
} from "../utils";
import FoodList from "../component/FoodList";
import jwt from "jwt-decode";
import FoodInfo from "../component/FoodInfo";
import CategoryCardEdit from "../component/CategoryCardEdit";

const SearchPage = () => {
  const [mapResponse, setMapResponse] = useState({
    photo: null,
    name: null,
    rating: null,
    address: null,
    isOpen: null,
    businessStatus: null,
  });
  const [mapAPILoaded, setMapAPILoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState();
  const [mapAPI, setMapAPI] = useState();

  const { userId } = useParams();
  const [UIState, setUIState] = useState("loading");
  const [foodlist, setFoodlist] = useState();
  const [userEmail, setUserEmail] = useState();
  const [refresh, setRefresh] = useState(false);

  const { path, url } = useRouteMatch();
  const history = useHistory();

  const toast = useToast();

  const handleDeleteItem = async ({ category, placeInfo, setCardUIState }) => {
    console.log("Delete Item!");
    // Delete food
    await updateNewFood({
      email: userEmail,
      category,
      originFoodIds: foodlist[category].placeIds.filter((value, idx, arr) => {
        return value !== placeInfo.placeId;
      }),
    });
    setRefresh(!refresh);

    history.push(`${url}`);
    console.log({ refresh });
    toast({
      title: `Delete successfully!`,
      description: `${placeInfo.name} have been deleted`,
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top"
    })
    setCardUIState("success")
  };

  const handleDeleteCategory = async ({ category }) => {
    console.log("Click!");
    await deleteCategory({
      email: userEmail,
      category,
    });
    setRefresh(!refresh);
  };

  const onMapLoaded = async ({ map, maps }) => {
    console.log("finish loaded");

    setMapAPILoaded(true);
    setMapInstance(map);
    setMapAPI(maps);
  };

  const [emptyList, setEmptyList] = useState(false);

  useEffect(() => {
    console.log("Enter");
    setUIState("loading")
    const email = jwt(userId).email;
    setUserEmail(email);
    getUserFoodList(email)
      .then((response) => {
        console.log("response", response);

        const foodlist = response.data.data.foodList;
        console.log({ foodlist });

        if (Object.keys(foodlist).length === 0) {
          setEmptyList(true);
        }
        setFoodlist(foodlist);
        setPlaceInfo({});
        
        setUIState("finish");
      })
      .catch((err) => {
        setUIState("error");
        console.log(err);
      });
  }, [refresh]);

  /*
    placeInfo: 
    {
      "Ramen": [],
      "Curry": []
    }
  */

  const onFinishLoaded = ({ results, placeId, category }) => {
    results["placeId"] = placeId;
    results["category"] = category;
    console.log({ results });
    setPlaceInfo((currentState) => ({
      ...currentState,
      [category]: [
        ...(currentState.hasOwnProperty(category)
          ? currentState[category]
          : []),
        results,
      ],
    }));
  };
  const [placeInfo, setPlaceInfo] = useState({});
  const [placeIcons, setPlaceIcons] = useState({});
  const [checkBoxState, setCheckboxState] = useState({});
  const [checkAll, setCheckAll] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState();

  useEffect(() => {
    console.log({ checkBoxState });
    if (foodlist && Object.keys(checkBoxState).length === 0) {
      // initialize
      setCheckboxState(
        Object.keys(foodlist).reduce(
          (acc, cur) => ({
            ...acc,
            [cur]: true,
          }),
          {}
        )
      );
    }
  }, [foodlist]);
  const handleChangeFilter = ({ status, category }) => {
    const obj = {
      ...checkBoxState,
      [category]: status,
    };
    setCheckboxState(obj);
    const allBool = Object.keys(obj).every((cur) => obj[cur]);
    setCheckAll(allBool);
  };
  const handleChangeAllFilter = (e) => {
    setCheckboxState((state) =>
      Object.keys(state).reduce(
        (acc, cur) => ({
          ...acc,
          [cur]: e.target.checked,
        }),
        {}
      )
    );
    setCheckAll(!checkAll);
    console.log("ALl Clicked!!");
  };
  console.log({ placeInfo });
  useEffect(() => {
    if (
      foodlist &&
      userEmail &&
      mapAPI &&
      mapInstance &&
      UIState === "finish"
    ) {
      console.log({ foodlist });
      Object.keys(foodlist).forEach((category) => {
        setPlaceIcons((currentState) => ({
          ...currentState,
          [category]: foodlist[category].icon,
        }));
        setPlaceInfo((currentState) => ({
          ...currentState,
          [category]: [
            ...(currentState.hasOwnProperty(category)
              ? currentState[category]
              : []),
          ],
        }));
        foodlist[category].placeIds.forEach((placeId) => {
          getPlaceDetails({
            mapAPILoaded,
            mapAPI,
            mapInstance,
            placeId,
            category,
            onFinishLoaded,
          });
        });
      });
    }
  }, [foodlist, userEmail, mapAPI, mapInstance, mapAPILoaded, UIState]);

  console.log({ UIState });
  return (
    <>
      <Center>
        <SearchBox
          setMapResponse={setMapResponse}
          mapAPILoaded={mapAPILoaded}
          mapInstance={mapInstance}
          mapAPI={mapAPI}
        />
      </Center>
      <Switch>
        <Route path={`${path}`} exact>
          <Flex justify="space-between" mt="70px">
            <FoodList
              foodlist={foodlist}
              emptyList={emptyList}
              email={userEmail}
              handleDeleteItem={handleDeleteItem}
              handleDeleteCategory={handleDeleteCategory}
              handleChangeAllFilter={handleChangeAllFilter}
              handleChangeFilter={handleChangeFilter}
              checkBoxState={checkBoxState}
              checkAll={checkAll}
              placeInfo={placeInfo}
              setSelectedPlace={setSelectedPlace}
              FoodListUIState={UIState}
            />
            <FoodMap
              foodlist={foodlist}
              onMapLoaded={onMapLoaded}
              placeInfo={placeInfo}
              placeIcons={placeIcons}
              checkBoxState={checkBoxState}
              setSelectedPlace={setSelectedPlace}
            />
          </Flex>
        </Route>
        <Route path={`${path}/add/:placeId`}>
          <Stack mt="100px" spacing="25px">
            <FoodInfo
              mapResponse={mapResponse}
              isSave={false}
              foodlist={foodlist}
              email={userEmail}
            />
            {/* <CategoryCard foodlist={foodlist} email={userEmail} /> */}
          </Stack>
        </Route>
        <Route path={`${path}/show/:placeId`}>
          <Stack mt="100px" spacing="25px">
            <FoodInfo
              mapResponse={selectedPlace}
              isSave={true}
              removeCard={handleDeleteItem}
              placeInfo={selectedPlace}
            />
            {/* <CategoryCardEdit
              removeCard={handleDeleteItem}
              placeInfo={selectedPlace}
            /> */}
          </Stack>
        </Route>
      </Switch>
    </>
  );
};
export default SearchPage;
