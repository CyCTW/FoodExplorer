import { Image, Text } from "@chakra-ui/react";
import ramen from "../icon/ramen.png";

const FoodMarker = ({ icon, food, lat, lng }) => {
  console.log({ lat });
  console.log({ lng });
  return (
    <>
      <Image src={icon} boxSize="20px" />
      <p>{food}</p>
    </>
  );
};
export default FoodMarker;
