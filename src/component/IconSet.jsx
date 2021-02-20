import { Button, Image } from "@chakra-ui/react";
import Ramen from "../icon/ramen.png";
import Curry from "../icon/curry.png";
import BubbleTea from "../icon/bubble-tea.png"

const IconSet = ({ setImgURI }) => {
  const icons = [Ramen, Curry, BubbleTea];
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
