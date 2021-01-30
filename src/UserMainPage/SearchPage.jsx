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
import {  SearchIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";
import MapContext from "../component/MapContext";

import { debounce } from "lodash";
import EmptyListPage from "./EmptyListPage";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import FoodCard from "../component/FoodCard";

const SearchPage = () => {
  // useContext: mapApiLoaded
  const { mapAPILoaded, mapInstance, mapAPI } = useContext(MapContext);

  const [inputText, setInputText] = useState();
  const [autocompleteSearch, setAutocompleteSearch] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [mapResponse, setMapResponse] = useState({
    photo: null,
    name: null,
    rating: null,
    address: null,
    isOpen: null,
    businessStatus: null,
  })
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
  useEffect(() => {
    if (searchResult !== null) {
      history.push(`${url}/food`);
    }
  }, [searchResult]);
  const handleInputOnChange = (e) => {
    console.log(e.target.value);
    setInputText(e.target.value);
  };
  const handleClickItem = (e) => {
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
        "utc_offset_minutes" 
      ],
    };
    service.getDetails(request, (results, status) => {
      if (status === mapAPI.places.PlacesServiceStatus.OK) {
        console.log(results);
        // deal with null value

        setMapResponse({
            photos: (results.photos) ? results.photos: null,
            name: results.name && results.name,
            rating: results.rating && results.rating,
            formatted_address: results.formatted_address && results.formatted_address,
            opening_hours: results.opening_hours && results.opening_hours,
            utc_offset_minutes: results.utc_offset_minutes
        })
      }
    });
    setInputText(null)
    history.push(`${url}/food`);

  };
  //   console.log({ autocompleteSearch });
  return (
    <Flex direction="column" align="center">
      <Flex w="300px">
        {/* <IconButton
          variant="ghost"
          aria-label="Search database"
          icon={<ArrowBackIcon />}
        /> */}
        <Popover placement="right" isOpen>
          <PopoverTrigger>
            <IconButton icon={<SearchIcon />} />
          </PopoverTrigger>
          <PopoverContent>
            <Input
              w="md"
              border="2px"
              type="tel"
              placeholder="Search restaurant/place"
              //   onChange={debounce(handleInputOnChange, 500)}
              onChange={handleInputOnChange}
              value={inputText && inputText}
            />
            {/* <Input value={searchResult} onChange={(e) => setSearchResult(e.target.value) } /> */}
            <div
              onClick={(e) => {
                console.log(e.target.dataset);
              }}
            >
              {autocompleteSearch &&
                inputText &&
                !searchResult &&
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
            </div>
          </PopoverContent>
        </Popover>
      </Flex>

      <Switch>
        <Route path={`${path}`} exact>
          <EmptyListPage />
        </Route>
        <Route path={`${path}/:foodId`}>
          <FoodCard mapResponse={mapResponse}/>
        </Route>
      </Switch>
    </Flex>
  );
};
export default SearchPage;
