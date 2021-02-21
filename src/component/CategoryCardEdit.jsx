import { DeleteIcon, Icon, LinkIcon } from "@chakra-ui/icons";
import { Button, Center, Stack, useToast } from "@chakra-ui/react";
import { useState } from "react";

const CategoryCardEdit = ({ removeCard, placeInfo }) => {
  const [UIState, setUIState] = useState("success");

  const toast = useToast();

  const getPosition = (encodedAddress) => {
    const success = (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const url = `https://www.google.com/maps/dir/?api=1&origin=${encodedAddress}&destination=${lat},${lng}`;
      window.open(url);
    };
    const error = () => {
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
  const handleDirection = async () => {
    const address = placeInfo.formatted_address;
    const encodedAddress = encodeURI(address);

    getPosition(encodedAddress);
  };
 
  return (
    <>
      <Button bgColor="#febc00" color="black" mt="40px" onClick={handleDirection}>
        <LinkIcon mr={3} />
        Direction
      </Button>
      <Button
        color="black" variant="unstyled" mt="10px" border="1px solid black"
        onClick={() => {
          setUIState("loading")
          removeCard({ category: placeInfo.category, placeInfo, setCardUIState: setUIState })


        }}
        isLoading={UIState === "loading"}
      >
        <DeleteIcon mr={3} />
        Remove from list
      </Button>
    </>
  );
};
export default CategoryCardEdit;
