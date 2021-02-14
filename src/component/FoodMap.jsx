import { Box } from "@chakra-ui/react";
import GoogleMapReact from "google-map-react";
import { useContext, useState } from "react";
import { MapAPIKey } from "../key";
import FoodMarker from "./FoodMarker";

const FoodMap = ({ onMapLoaded, placeInfo, placeIcons}) => {
  // const { mapAPILoaded, mapAPI } = useContext(MapContext);
  const mprops = {
    center: {
      lat: 25.04,
      lng: 121.5,
    },
    zoom: 13,
  };
  console.log("Enter Foodmap", {placeInfo})
  console.log({placeIcons})
  console.log("???")
  
  const [selectedPlace, setSelectedPlace] = useState({category: "null", idx: -1});

  const handleClickPlace = ({category, idx}) => {
    setSelectedPlace({category, idx});
    console.log("Click");
  }
  console.log({selectedPlace})

  return (
    <Box mt={5} style={{ height: "100vh", width: "50%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: MapAPIKey,
          libraries: ["places"], // 要在這邊放入我們要使用的 API
        }}
        defaultCenter={mprops.center}
        defaultZoom={mprops.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={onMapLoaded}
      >
        {placeInfo &&
          Object.keys(placeInfo).map((category) => {
            return placeInfo[category].map((place, idx) => {
              return <FoodMarker
                icon={placeIcons[category]}
                food={place.name}
                category={category}
                lat={place.geometry.location.lat()}
                lng={place.geometry.location.lng()}
                handleClickPlace={handleClickPlace}
                selectedPlace={selectedPlace}
                placeInfo={place}
                key={idx}
                idx={idx}
              ></FoodMarker>;
            });
          })}
      </GoogleMapReact>
    </Box>
  );
};
export default FoodMap;
