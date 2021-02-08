import { Text } from "@chakra-ui/react";

const FoodList = ({ foodlist }) => {
  return (
    <div>
      {foodlist &&
        Object.keys(foodlist).map((item) => {
          return (
            <div>
              <Text fontSize="4xl">{item}</Text>
              {foodlist[item].map((food) => {
                return <Text>{food}</Text>;
              })}
            </div>
          );
        })}
    </div>
  );
};
export default FoodList;
