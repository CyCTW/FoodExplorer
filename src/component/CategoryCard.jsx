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
import { Link } from "react-router-dom";

const CategoryCard = ({ categoryList, setCategoryList }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [userInput, setUserInput] = useState();
  const [selectedCategory, setSelectedCategory] = useState();

  //   console.log(categoryList)
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
                <MenuItem m={2} onClick={() => setSelectedCategory(item)}>
                  {item}
                </MenuItem>
              );
            })}
          <MenuItem
            m={2}
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
                    onClick={() => {
                      //   console.log("cList", categoryList)
                      let nowArr = [...categoryList];
                      nowArr.push(userInput);
                      //   console.log("nowARr", nowArr)
                      setCategoryList(nowArr);
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
      <Button as={Link} to="/user/dsffsd" colorScheme="blue">
        Save to List
      </Button>
    </Stack>
  );
};
export default CategoryCard;
