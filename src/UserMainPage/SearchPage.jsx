import {
  Box,
  Center,
  Flex,
  HStack,
  IconButton,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Square,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";
import MapContext from "../component/MapContext";

import { debounce } from "lodash";
import EmptyListPage from "./EmptyListPage";
import {
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import FoodCard from "../component/FoodCard";
import CategoryCard from "../component/CategoryCard";
import FoodMap from "../component/FoodMap";
import SearchBox from "../component/SearchBox";
// import FoodList from "../component/FoodList";
import { getUserFoodList } from "../utils";
import FoodList from "../component/FoodList";
import jwt from "jwt-decode";

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
  const [categoryList, setCategoryList] = useState([]);
  let { userId } = useParams();
  const [UIState, setUIState] = useState("loading");
  const [foodlist, setFoodlist] = useState();
  const [userEmail, setUserEmail] = useState();

  let { path, url } = useRouteMatch();
  console.log("CategoryList: ", categoryList);

  useEffect(() => {
    const email = jwt(userId).email;
    setUserEmail(email);
    getUserFoodList(email)
      .then((response) => {
        console.log("response", response);

        const foodlist = response.data.data.foodList;
        console.log(foodlist);
        setFoodlist(foodlist);
        setUIState("finish");
      })
      .catch((err) => {
        setUIState("error");
        console.log(err);
      });
  }, []);

  console.log({ UIState });
  return (
    <Flex direction="column">
      <Center>
        <SearchBox setMapResponse={setMapResponse} />
      </Center>
      <Switch>
        <Route path={`${path}`} exact>
          <Flex justify="space-between">
            <FoodList foodlist={foodlist} email={userEmail}/>
            <FoodMap />
          </Flex>
        </Route>
        <Route path={`${path}/:foodname`}>
          <FoodCard mapResponse={mapResponse} />

          <CategoryCard
            categoryList={categoryList}
            setCategoryList={setCategoryList}
            foodlist={foodlist}
            email={userEmail}
          />
        </Route>
      </Switch>
    </Flex>
  );
};
export default SearchPage;
