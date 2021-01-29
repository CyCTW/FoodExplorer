import { Box, Flex, IconButton, Input, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";
import MapContext from "../component/MapContext";

import { debounce } from "lodash";

const SearchPage = () => {
  // useContext: mapApiLoaded
  const {
    mapAPILoaded,
    mapAPI,
  } = useContext(MapContext);

  const [inputText, setInputText] = useState();
  const [autocompleteSearch, setAutocompleteSearch] = useState([]);

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
  const handleInputOnChange = (e) => {
    console.log(e.target.value);
    setInputText(e.target.value);
  };
  
//   console.log({ autocompleteSearch });
  return (
    <Flex direction="column" align="center">
      <Flex m={5} w="300px">
        <IconButton
          variant="ghost"
          aria-label="Search database"
          icon={<ArrowBackIcon />}
        />
        <Input
          w="md"
          border="0px"
          focusBorderColor="white"
          type="tel"
          placeholder="Search restaurant/place"
          onChange={debounce(handleInputOnChange, 500)}
        />
      </Flex>
      {(autocompleteSearch && inputText) && autocompleteSearch.map((res) => {
        return (
          <Box mt={4} key={res.id} dataid={res.place_id} w="300px" as="button">
            <Text fontSize="lg" align="left">{res.structured_formatting.main_text}</Text>
            <Text fontSize="sm" align="left">{res.structured_formatting.secondary_text}</Text>
          </Box>
        );
      })}      

    </Flex>
  );
};
export default SearchPage;
