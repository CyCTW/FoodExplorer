import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  Button,
  Stack,
  Text,
  MenuItem,
  ButtonGroup,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateNewFood } from "../utils";

const CategoryCard = ({ foodlist, email }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [userInput, setUserInput] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  let { foodname } = useParams();
  console.log({ foodname });
  // categoryList temperoaly store the list change
  const [categoryList, setCategoryList] = useState(Object.keys(foodlist));
  const history = useHistory();

  const handleStoreFood = async () => {
    // update food
    await updateNewFood({
      email,
      category: selectedCategory,
      foodname,
      originFoodnames: (Object.keys(foodlist).indexOf(selectedCategory) != -1) ? foodlist[selectedCategory] : [],
    });
    history.push("/");
  };
  console.log({ selectedCategory });
  return (
    <Stack spacing={7}>
      <Text>Category</Text>

      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {selectedCategory ? selectedCategory : "Choose a category"}
        </MenuButton>
        <MenuList>
          {categoryList &&
            categoryList.map((item) => {
              return (
                <MenuItem onClick={() => setSelectedCategory(item)}>
                  {item}
                </MenuItem>
              );
            })}
          <MenuItem
            borderTop="solid 2px gray"
            colorScheme="blue"
            onClick={onOpen}
          >
            + Create category
          </MenuItem>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create Category</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stack spacing={10}>
                  <Input onChange={(e) => setUserInput(e.target.value)} />
                  <Button
                    colorScheme="cyan"
                    as={Link}
                    onClick={async () => {
                      setCategoryList([...categoryList, userInput]);
                      setSelectedCategory(userInput);

                      // create food list
                      await updateNewFood({ email, category: userInput, originFoodnames: [] });
                      onClose();
                    }}
                  >
                    Create
                  </Button>
                </Stack>
              </ModalBody>
            </ModalContent>
          </Modal>
        </MenuList>
      </Menu>
      <Button onClick={handleStoreFood} colorScheme="blue">
        Save to List
      </Button>
    </Stack>
  );
};
export default CategoryCard;
