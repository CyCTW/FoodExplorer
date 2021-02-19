import { DeleteIcon, Icon, LinkIcon } from "@chakra-ui/icons";
import { Button, Center, Stack, useToast } from "@chakra-ui/react";

const CategoryCardEdit = ({ removeCard, placeInfo }) => {
  const toast = useToast();

  const getPosition = (encodedAddress) => {
    const success = (position) => {
      console.log({ position });
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      console.log(lat, lng);
      const url = `https://www.google.com/maps/dir/?api=1&origin=${encodedAddress}&destination=${lat},${lng}`;
      window.open(url);
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
  const handleDirection = async () => {
    const address = placeInfo.formatted_address;
    console.log(address);
    const encodedAddress = encodeURI(address);
    console.log(encodedAddress);

    getPosition(encodedAddress);
  };
  return (
    <Center mt={9}>
      <Stack w="300px" spacing="20px">
        <Button colorScheme="blue" onClick={handleDirection}>
          <LinkIcon mr={3} />
          Direction
        </Button>
        <Button
          colorScheme="red"
          variant="outline"
          onClick={() =>
            removeCard({ category: placeInfo.category, placeInfo })
          }
        >
          <DeleteIcon mr={3}/>
          Remove from list
        </Button>
      </Stack>
    </Center>
  );
};
export default CategoryCardEdit;
