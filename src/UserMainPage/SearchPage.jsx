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
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import FoodCard from "../component/FoodCard";
import CategoryCard from "../component/CategoryCard";
import FoodMap from "../component/FoodMap";

const SearchPage = () => {
  // useContext: mapApiLoaded
  const { mapAPILoaded, mapInstance, mapAPI } = useContext(MapContext);

  const [inputText, setInputText] = useState();
  const [autocompleteSearch, setAutocompleteSearch] = useState([]);
  //   const [searchResult, setSearchResult] = useState(null);
  const [mapResponse, setMapResponse] = useState({
    photo: null,
    name: null,
    rating: null,
    address: null,
    isOpen: null,
    businessStatus: null,
  });
  const [categoryList, setCategoryList] = useState([]);
  let { path, url } = useRouteMatch();
  const history = useHistory();

  const handleAutoComplete = () => {
    if (mapAPILoaded && inputText) {
      console.log("enter!");
      const service = new mapAPI.places.AutocompleteService();
      //   const service = new mapAPI.places.PlacesService(mapInstance);
      const request = {
        input: inputText,
      };

      service.getPlacePredictions(request, (results, status) => {
        // console.log(results);
        if (status === mapAPI.places.PlacesServiceStatus.OK) {
          console.log(results);
          setAutocompleteSearch(results);
        }
      });
    }
  };
  useEffect(() => {
    handleAutoComplete();
  }, [inputText]);
  //   useEffect(() => {
  //     if (searchResult !== null) {
  //       history.push(`${url}/food`);
  //     }
  //   }, [searchResult]);
  const handleInputOnChange = (e) => {
    console.log(e.target.value);
    setInputText(e.target.value);
  };
  const handleClickItem = async (e) => {
    const placeId = e.target.getAttribute("dataid");

    const service = new mapAPI.places.PlacesService(mapInstance);
    const request = {
      placeId,
      fields: [
        "name",
        "rating", // 評價
        "formatted_address", // 地址
        "formatted_phone_number", // 電話
        "geometry", // 幾何資訊
        "opening_hours", // 營業時間資訊
        "photos",
        "utc_offset_minutes",
      ],
    };
    await service.getDetails(request, (results, status) => {
      if (status === mapAPI.places.PlacesServiceStatus.OK) {
        // console.log(results.opening_hours.weekday_text);
        // deal with null value

        setMapResponse({
          photos: results.photos ? results.photos : null,
          name: results.name && results.name,
          rating: results.rating && results.rating,
          formatted_address:
            results.formatted_address && results.formatted_address,
          weekday: results.opening_hours && results.opening_hours.weekday_text,
          isOpen: results.opening_hours && results.opening_hours.isOpen(),
          // utc_offset_minutes: results.utc_offset_minutes && results.utc_offset_minutes
        });
      }
    });
    setInputText(null);
    history.push(`${url}/food`);
  };
  return (
    <Flex direction="column" align="center">
      <Flex w="300px">
        <Popover placement="right" isOpen>
          <PopoverTrigger>
            <IconButton icon={<SearchIcon />} />
          </PopoverTrigger>
          <PopoverContent>
            <Input
              //   border="2px"
              focusBorderColor="pink.400"
              variant="outline"
              placeholder="Search restaurant/place"
              //   onChange={debounce(handleInputOnChange, 500)}
              onChange={handleInputOnChange}
              value={inputText && inputText}
              w="300px"
            />
            {autocompleteSearch &&
              inputText &&
              autocompleteSearch.map((res) => {
                return (
                  <Box
                    mt={4}
                    key={res.id}
                    dataid={res.place_id}
                    w="300px"
                    as="button"
                    onClick={handleClickItem}
                  >
                    <Text dataid={res.place_id} fontSize="lg" align="left">
                      {res.structured_formatting.main_text}
                    </Text>
                    <Text dataid={res.place_id} fontSize="sm" align="left">
                      {res.structured_formatting.secondary_text}
                    </Text>
                  </Box>
                );
              })}
          </PopoverContent>
        </Popover>
      </Flex>
      
      <FoodMap />

      <Switch>
        <Route path={`${path}`} exact>
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
