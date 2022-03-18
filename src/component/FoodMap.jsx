import { Search2Icon } from "@chakra-ui/icons";
import { Box, Button, IconButton, Image, useToast } from "@chakra-ui/react";
import GoogleMapReact from "google-map-react";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { MapAPIKey } from "../key";
import CurrentMarker from "./CurrentMarker";
import FoodMarker from "./FoodMarker";
import PositionMarker from "../icon/posMarker.png"

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
  const [userPos, setUserPos] = useState({
    lat: null,
    lng: null,
  })
  const defaultPosition = {
    lat: 25.04,
    lng: 121.5,
  };

  const [selectedPlaceMark, setSelectedPlaceMark] = useState({
    category: "null",
    idx: -1,
  });

  const handleClickPlace = ({ placeInfo, category, idx }) => {
    setSelectedPlaceMark({ category, idx });
    const lat = placeInfo.geometry && placeInfo.geometry.location.lat();
    const lng = placeInfo.geometry && placeInfo.geometry.location.lng();
    setCurrentPos({
      ...currentPos,
      center: {
        lat: placeInfo.geometry && placeInfo.geometry.location.lat(),
        lng: placeInfo.geometry && placeInfo.geometry.location.lng(),
      },
    });
  };
  const history = useHistory();
  const { url } = useRouteMatch();

  const handleClickPlaceCard = ({ placeInfo }) => {
    placeInfo["weekday"] = placeInfo.opening_hours && placeInfo.opening_hours.weekday_text;

    setSelectedPlace(placeInfo);

    history.push(`${url}/show/${placeInfo.placeId}`);
  };
  const toast = useToast();
  const handleCurrentPosition = () => {
    const success = (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      setCurrentPos( state => ({
        ...state,
        center: {
          lat,
          lng
        },
      }));
      setUserPos({
        lat,lng
      })
    };
    const error = () => {
      console.log("Positoin error");
      toast({
        title: "Direction Failed",
        description: "Please allow the website to use your position",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    };
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return (
    <>
      <Button>
      <Image
        onClick={handleCurrentPosition}
        style={{ zIndex: "5", position: "fixed", left: "52%", top: "90%" }}
        color="black"
        src={PositionMarker}
        boxSize="48px"
      />
      </Button>

      <Box
        style={{
          height: "95vh",
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
                return <></>;
              }
            })}
            <CurrentMarker lat={userPos.lat && userPos.lat} lng={userPos.lng && userPos.lng}/>
        </GoogleMapReact>
      </Box>
    </>
  );
};
export default FoodMap;
