import { Button, Image } from "@chakra-ui/react";
import Ramen from "../icon/ramen.png";
import Curry from "../icon/curry.png";
import BubbleTea from "../icon/bubble-tea.png"
import Hamburger from "../icon/hamburger.png"
import Drink from "../icon/drink.png"

const IconSet = ({ setImgURI }) => {
  const icons = [Ramen, Curry, BubbleTea, Hamburger, Drink];
  return (
    <>
      {icons.map((imgURI, idx) => {
        return (
          <Button variant="unstyled" key={idx} m={2}>
            <Image
              src={imgURI}
              border="solid 1px #f4f4f4"
              borderRadius="8px"
              boxSize="40px"
              onClick={() => {
                setImgURI(imgURI);
              }}
            />
          </Button>
        );
      })}
    </>
  );
};

export default IconSet;
