import {
  Center,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

// import { debounce } from "lodash";
// import EmptyListPage from "./EmptyListPage";
import {
  Route,
  Switch,
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
  // useContext: mapApiLoaded
  //   const { mapAPILoaded, mapInstance, mapAPI } = useContext(MapContext);

  //   const [inputText, setInputText] = useState();
  //   const [autocompleteSearch, setAutocompleteSearch] = useState([]);

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

  let { userId } = useParams();
  const [UIState, setUIState] = useState("loading");
  const [foodlist, setFoodlist] = useState();
  const [userEmail, setUserEmail] = useState();
  const [refresh, setRefresh] = useState(false);

  let { path, url } = useRouteMatch();

  const handleDeleteItem = async ({ category, placeInfo }) => {
    console.log("Click!");
    // Delete food
    await updateNewFood({
      email: userEmail,
      category,
      originFoodIds: foodlist[category].placeIds.filter((value, idx, arr) => {
        return value !== placeInfo.placeId; 
      }),
    });
    setRefresh(!refresh);
    console.log({ refresh });
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

  useEffect(() => {
    console.log("Enter");
    const email = jwt(userId).email;
    setUserEmail(email);
    getUserFoodList(email)
      .then((response) => {
        console.log("response", response);

        const foodlist = response.data.data.foodList;
        console.log({ foodlist });
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

  useEffect( () => {
    console.log({checkBoxState})
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
      )
    }
  }, [foodlist])
  const handleChangeFilter = ({ status, category }) => {

    const obj = {
      ...checkBoxState,
      [category]: status,
    }
    setCheckboxState(obj);
    const allBool = Object.keys(obj).every((cur) => obj[cur])
    setCheckAll( allBool ) 
  };
  const handleChangeAllFilter = (e) => {
    setCheckboxState( state => 
      Object.keys(state).reduce(
        (acc, cur) => ({
          ...acc,
          [cur]: e.target.checked,
        }),
        {}
      )
    );
    setCheckAll(!checkAll);
    console.log("ALl Clicked!!")
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
      Object.keys(foodlist).map((category, idx) => {
        setPlaceIcons((currentState) => ({
          ...currentState,
          [category]: foodlist[category].icon,
        }));
        foodlist[category].placeIds.map((placeId, idx) => {
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
    <Flex direction="column">
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
          <Flex justify="space-between">
            <FoodList
              foodlist={foodlist}
              email={userEmail}
              handleDeleteItem={handleDeleteItem}
              handleDeleteCategory={handleDeleteCategory}
              handleChangeAllFilter={handleChangeAllFilter}
              handleChangeFilter={handleChangeFilter}
              checkBoxState={checkBoxState}
              checkAll={checkAll}
              placeInfo={placeInfo}
              setSelectedPlace={setSelectedPlace}
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
          <FoodInfo mapResponse={mapResponse} />
          <CategoryCard foodlist={foodlist} email={userEmail} />
        </Route>
        <Route path={`${path}/show/:placeId`}>
          <FoodInfo mapResponse={selectedPlace} />
          <CategoryCardEdit />
        </Route>
      </Switch>
    </Flex>
  );
};
export default SearchPage;
