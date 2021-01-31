import { Box } from "@chakra-ui/react";
import GoogleMapReact from "google-map-react";
import { MapAPIKey } from "../key";

const FoodMap = () => {
  //   const { mapAPILoaded, mapInstance, mapAPI } = useContext(MapContext);
  const mprops = {
    center: {
      lat: 25.04,
      lng: 121.5,
    },
    zoom: 17,
  };
  return (
    <Box mt={5} style={{ height: "50vh", width: "50%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: MapAPIKey,
          libraries: ["places"], // 要在這邊放入我們要使用的 API
        }}
        defaultCenter={mprops.center}
        defaultZoom={mprops.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => {
          console.log("finish loaded second map");
          //     setMapAPILoaded(true);
          //     setMapInstance(map);
          //     setMapAPI(maps);
        }}
      />
    </Box>
  );
};
export default FoodMap;
