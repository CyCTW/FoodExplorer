import { Box } from "@chakra-ui/react";
import GoogleMapReact from "google-map-react";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { MapAPIKey } from "../key";
import FoodMarker from "./FoodMarker";

const FoodMap = ({
  onMapLoaded,
  placeInfo,
  placeIcons,
  checkBoxState,
  setSelectedPlace,
}) => {
  const [currentPos, setCurrentPos] = useState({
    center: {
      lat: 25.04,
      lng: 121.5,
    },
    zoom: 13,
  });
  const defaultPosition = {
    lat: 25.04,
    lng: 121.5
  }

  const [selectedPlaceMark, setSelectedPlaceMark] = useState({
    category: "null",
    idx: -1,
  });

  const handleClickPlace = ({ placeInfo, category, idx }) => {
    setSelectedPlaceMark({ category, idx });
    const lat = placeInfo.geometry.location.lat();
    const lng = placeInfo.geometry.location.lng()
    setCurrentPos({
      ...currentPos,
      center: {
        lat: placeInfo.geometry.location.lat(),
        lng: placeInfo.geometry.location.lng()
      }
    })
  };
  const history = useHistory();
  const { url } = useRouteMatch();

  const handleClickPlaceCard = ({ placeInfo }) => {
    placeInfo["weekday"] = placeInfo.opening_hours.weekday_text

    setSelectedPlace(placeInfo);
   
    history.push(`${url}/show/${placeInfo.placeId}`);
  };
  return (
    <Box
      style={{
        height: "100vh",
        width: "50%",
        position: "fixed",
        left: "50%",
        top: "60px",
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{
          key: MapAPIKey,
          libraries: ["places"], // 要在這邊放入我們要使用的 API
        }}
        defaultCenter={defaultPosition}
        defaultZoom={currentPos.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={onMapLoaded}
        center={currentPos.center}
      >
        {placeInfo &&
          Object.keys(placeInfo).map((category) => {
            if (checkBoxState[category] === true) {
              return placeInfo[category].map((place, idx) => {
                return (
                  <FoodMarker
                    icon={placeIcons[category]}
                    food={place.name}
                    category={category}
                    lat={place.geometry.location.lat()}
                    lng={place.geometry.location.lng()}
                    handleClickPlace={handleClickPlace}
                    handleClickPlaceCard={handleClickPlaceCard}
                    selectedPlaceMark={selectedPlaceMark}
                    placeInfo={place}
                    key={idx}
                    idx={idx}
                  ></FoodMarker>
                );
              });
            } else {
              return <></>
            }
          })}
      </GoogleMapReact>
    </Box>
  );
};
export default FoodMap;
