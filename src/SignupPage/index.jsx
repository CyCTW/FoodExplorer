import {
  Button,
  Checkbox,
  Link,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { Link as ReachLink, useHistory } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";

const SignupPage = () => {
    const history = useHistory();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    history.push("/user/asd")
  };
  return (
    <>
      <IconButton
        m={5}
        colorScheme="pink"
        size="lg"
        aria-label="goback"
        icon={<ArrowBackIcon />}
        as={ReachLink}
        to="/"
      />

      <Flex direction="column" align="center">
        <Text fontSize={50}>Sign up</Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="30px">
            <FormControl id="email" isRequired w="300px">
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                ref={register}
                placeholder="example@gmail.com"
              />
            </FormControl>
            <FormControl id="username" isRequired w="300px">
              <FormLabel>Username</FormLabel>
              <Input name="username" type="username" ref={register} />
            </FormControl>
            <FormControl id="password" isRequired w="300px">
              <FormLabel>Password</FormLabel>
              <Input name="password" type="password" ref={register} />
            </FormControl>
            <Button type="submit" colorScheme="blue" w="300px">
              Sign up
            </Button>
            <Button as={ReachLink} w="300px">
              Sign up with Facebook
            </Button>
            <Button as={ReachLink} w="300px">
              Sign up with Google
            </Button>
          </Stack>
        </form>

      </Flex>
    </>
  );
};
export default SignupPage;
