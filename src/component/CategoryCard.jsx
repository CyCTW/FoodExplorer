import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  Button,
  Stack,
  Text,
  MenuItem,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Flex,
  FormControl,
  FormLabel,
  Image,
  HStack,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateNewFood } from "../utils";
import IconSet from "./IconSet";

const CategoryCard = ({ foodlist, email }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [userInput, setUserInput] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  let { placeId } = useParams();
  // categoryList temperoaly store the list change
  const [categoryList, setCategoryList] = useState(
    foodlist && Object.keys(foodlist)
  );
  useEffect(() => {
    if (foodlist) {
      setCategoryList(Object.keys(foodlist));
    } else {
      setCategoryList([]);
    }
  }, [foodlist]);
  console.log({ categoryList });
  const history = useHistory();

  const handleStoreFood = async () => {
    // update food
    setUIState("loading");
    await updateNewFood({
      email,
      category: selectedCategory,
      foodId: placeId,
      originFoodIds:
        Object.keys(foodlist).indexOf(selectedCategory) !== -1
          ? foodlist[selectedCategory].placeIds
          : [],
    });
    setUIState("finish");

    history.push("/");
  };
  console.log({ selectedCategory });
  const inputRef = useRef();

  const [imgURI, setImgURI] = useState();
  const handleFileChange = (e) => {
    const img = e.target.files[0];
    let reader = new FileReader();
    reader.onload = (r) => {
      const URI = r.target.result;
      console.log(URI);
      setImgURI(URI);
    };
    reader.readAsDataURL(img);
  };
  const [UIState, setUIState] = useState("finish");

  return (
    <Flex direction="column" align="center" mt={5}>

      <Menu mt={5}>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w="300px">
          {selectedCategory ? selectedCategory : "Choose a category"}
        </MenuButton>
        <MenuList>
          {categoryList &&
            categoryList.map((item, idx) => {
              return (
                <MenuItem key={idx} onClick={() => setSelectedCategory(item)}>
                  {item}
                </MenuItem>
              );
            })}
          <MenuItem borderTop="solid 2px #f4f4f4" onClick={onOpen}>
            + Create category
          </MenuItem>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create Category</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stack spacing={10}>
                  <FormControl>
                    <FormLabel as={Text} fontSize="lg">Category Name</FormLabel>
                    <Input onChange={(e) => setUserInput(e.target.value)} />
                    <FormLabel as={Text} fontSize="lg" mt={5}>Category Icon</FormLabel>
                    <Text>Choose an icon</Text>
                    <IconSet setImgURI={setImgURI}/>
                    <Text>or upload a custom icon</Text>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      ref={inputRef}
                      onChange={handleFileChange}
                    />
                    <HStack spacing="20px">
                      <Button
                        onClick={() => {
                          inputRef.current.click();
                        }}
                      >
                        Choose an Icon
                      </Button>
                      <Image
                        border="solid 1px #f4f4f4"
                        borderRadius="8px"
                        src={imgURI && imgURI}
                        boxSize="50px"
                      />
                    </HStack>
                  </FormControl>
                  <Button
                    bgColor="#febc00"
                    as={Link}
                    isLoading={UIState === "loading"}
                    onClick={async () => {
                      setUIState("loading");
                      setCategoryList([...categoryList, userInput]);
                      setSelectedCategory(userInput);

                      // create food list
                      await updateNewFood({
                        email,
                        category: userInput,
                        originFoodIds: [],
                        icon: imgURI,
                      });
                      setUIState("finish");

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
      <Button
        onClick={handleStoreFood}
        isLoading={UIState === "loading"}
        variant="unstyled"
        bgColor="black"
        color="white"
        mt={10}
        w="300px"
      >
        Save to List
      </Button>
    </Flex>
  );
};
export default CategoryCard;
