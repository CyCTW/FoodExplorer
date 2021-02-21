import {
  Button,
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
  Link,
} from "@chakra-ui/react";
import {
  Link as ReachLink,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { AuthGetJWT, AuthLogin, AuthSignup } from "../component/Auth";
import { useState } from "react";
import { createUser } from "../utils";

const SignupPage = ({handleLogin}) => {
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  let { path } = useRouteMatch();
  const [UIState, setUIState] = useState();


  const onSubmit = async (data) => {
    setUIState("loading");
    try {
      await AuthSignup({
        email: data.email,
        password: data.password,
      });
      await AuthLogin({ email: data.email, password: data.password });
      await createUser({ email: data.email});

      AuthGetJWT()
        .then((token) => {
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
      <Switch>
        <Route path={`${path}`} exact>
          <Flex direction="column" align="center" mt="100px">
            <Heading size="3xl" m={5}>
              Sign up
            </Heading>
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
                <FormControl
                  id="username"
                  isRequired
                  w="300px"
                  isInvalid={UIState === "error"}
                >
                  <FormLabel>Username</FormLabel>
                  <Input name="username" type="username" ref={register} />
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
                      Email has been register
                    </FormHelperText>
                  )}
                </FormControl>
                <HStack>
                  <Text>Already has an account? </Text>
                  <Text color="blue.500" as={ReachLink} to="/signin">
                    Sign in
                  </Text>
                </HStack>
                <Button
                  isLoading={UIState === "loading"}
                  type="submit"
                  bgColor="#febc00"
                  color="black"
                  w="300px"
                >
                  Sign up
                </Button>
              </Stack>
            </form>
          </Flex>
        </Route>
        <Route path={`${path}/confirm`}>
          <Text>Sign up successfully! Please check your email.</Text>
        </Route>
      </Switch>
    </>
  );
};
export default SignupPage;
