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
  FormHelperText,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { Link as ReachLink, useHistory } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { AuthGetJWT, AuthLogin } from "../component/Auth";
import { useState } from "react";

const SigninPage = ({ handleLogin }) => {
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const [UIState, setUIState] = useState();

  const onSubmit = async (data) => {
    console.log(data);
    setUIState("loading");
    try {
      await AuthLogin({ email: data.email, password: data.password });

      AuthGetJWT()
        .then((token) => {
          console.log("token", token);
          setUIState("success");
          handleLogin({ token });
          history.push(`/user/${token}`);
        })
        .catch((err) => {
          console.log("error occured", err);
        });
    } catch (error) {
      console.log("error", error);
      setUIState("error");

      return error;
    }
  };
  return (
    <>
      <Flex direction="column" align="center" mt="100px">
        <Heading size="3xl" m={5} >Sign in</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="30px">
            <FormControl
              id="email"
              isRequired
              w="300px"
              isInvalid={UIState === "error"}
            >
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                ref={register}
                placeholder="example@gmail.com"
              />
            </FormControl>
            <FormControl
              id="password"
              isRequired
              w="300px"
              isInvalid={UIState === "error"}
            >
              <FormLabel>Password</FormLabel>
              <Input name="password" type="password" ref={register} />
              {UIState === "error" && (
                <FormHelperText color="red.500">
                  Email or password invalid
                </FormHelperText>
              )}
            </FormControl>
            <Checkbox w="300px">Remember me</Checkbox>
            <HStack>
              <Text>Do not have an account? </Text>
              <Text color="blue.500" as={ReachLink} to="/signup">
                Sign up
              </Text>
            </HStack>
            
            <Button
              isLoading={UIState === "loading"}
              type="submit"
              bgColor="#febc00"
              color="black"
              w="300px"
            >
              Sign in
            </Button>
          </Stack>
        </form>
      </Flex>
    </>
  );
};
export default SigninPage;
