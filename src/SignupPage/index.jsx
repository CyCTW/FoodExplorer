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
import { createUser } from "../utils";
import { useState } from "react";

const SignupPage = () => {
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  let { path, url } = useRouteMatch();
  const [UIState, setUIState] = useState();

  const onSubmit = async (data) => {
    console.log("data", data);
    try {
      setUIState("loading");
      await AuthSignup({
        email: data.email,
        password: data.password,
      });
      history.push(`/confirm`);
    } catch (error) {
      setUIState("error");
      console.log("Submit error", error);
    }
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

      <Switch>
        <Route path={`${path}`} exact>
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
                <Button
                  isLoading={UIState === "loading"}
                  type="submit"
                  colorScheme="blue"
                  w="300px"
                >
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
        </Route>
        <Route path={`${path}/confirm`}>
          <Text>Sign up successfully! Please check your email.</Text>
        </Route>
      </Switch>
    </>
  );
};
export default SignupPage;
