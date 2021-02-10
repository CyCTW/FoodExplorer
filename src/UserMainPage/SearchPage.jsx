import {
  Box,
  Flex,
  IconButton,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
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
  let { path, url } = useRouteMatch();
  console.log("CategoryList: ", categoryList);

  useEffect(() => {
    getUserFoodList(userId)
      .then((response) => {
        console.log("response", response)

        const foodlist = response.data.data.foodList
        console.log(foodlist)
        setFoodlist(foodlist)
        setUIState("finish");
      })
      .catch((err) => {
        setUIState("error");
        console.log(err);
      });
  }, []);

  console.log({UIState})
  return (
    <Flex direction="column" align="center">
      <SearchBox setMapResponse={setMapResponse} />

      <Switch>
        <Route path={`${path}`} exact>
          <FoodMap />
          <FoodList foodlist={foodlist}/>
          <EmptyListPage />
        </Route>
        <Route path={`${path}/:foodId`}>
          <FoodCard mapResponse={mapResponse} />

          <CategoryCard
            categoryList={categoryList}
            setCategoryList={setCategoryList}
          />
        </Route>
      </Switch>
    </Flex>
  );
};
export default SearchPage;
