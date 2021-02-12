import { Image, Text } from "@chakra-ui/react";
import ramen from "../icon/ramen.png";

const FoodMarker = ({ category, food, lat, lng }) => {
  console.log({ lat });
  console.log({ lng });
  return (
    <>
      <Image src={ramen} boxSize="20px" />
      <Text>{food}</Text>
    </>
  );
};
export default FoodMarker;
