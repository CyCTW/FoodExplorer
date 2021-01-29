import { createContext, useEffect, useState } from "react";
import { Key } from "../key";
import GoogleMapReact from "google-map-react";

const MapContext = createContext({
  mapAPILoaded: null,
  mapInstance: null,
  mapAPI: null,
  setMapAPILoaded: null,
  setMapInstance: null,
  setMapAPI: null,
});

export const MapProvider = ({ children }) => {
  const [mapAPILoaded, setMapAPILoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState();
  const [mapAPI, setMapAPI] = useState();
  useEffect(() => {
    console.log("MapAPI Loaded...");
  }, []);
  const mprops = {
    center: {
      lat: 25.04,
      lng: 121.5,
    },
    zoom: 17,
  };
  return (
    <MapContext.Provider
      value={{
        mapAPILoaded,
        mapInstance,
        mapAPI,
        setMapAPILoaded,
        setMapInstance,
        setMapAPI,
      }}
    >
      {children}
      {/* <div style={{ height: "100vh", width: "100%" }}> */}
      <GoogleMapReact
        bootstrapURLKeys={{
          key: Key,
          libraries: ["places"], // 要在這邊放入我們要使用的 API
        }}
        defaultCenter={mprops.center}
        defaultZoom={mprops.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => {
          console.log("finish loaded");
          setMapAPILoaded(true);
          setMapInstance(map);
          setMapAPI(maps);
        }}
        style={{ display: "none" }}
      />
      {/* </div> */}
    </MapContext.Provider>
  );
};
export default MapContext;
