import { Button, HStack, Image, Text } from "@chakra-ui/react";
import PlaceCard from "./PlaceCard";

const FoodMarker = ({
  idx,
  icon,
  food,
  category,
  placeInfo,
  selectedPlaceMark,
  handleClickPlace,
  handleClickPlaceCard
}) => {
  
  return (
    <>
      <Button
        variant="unstyled"
        onClick={() => handleClickPlace({ placeInfo, category, idx })}
      >
        <HStack>
          <Image src={icon} boxSize="20px" />
          <Text fontSize="15px" color="black">
            {food}
          </Text>
        </HStack>
      </Button>
      {selectedPlaceMark.idx === idx && selectedPlaceMark.category === category && (
        <PlaceCard handleClickPlaceCard={handleClickPlaceCard} placeInfo={placeInfo} />
      )}
    </>
  );
};
export default FoodMarker;
