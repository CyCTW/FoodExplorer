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
import { Link as ReachLink, useHistory } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { AuthGetJWT, AuthLogin } from "../component/Auth";
import { getUserFoodList } from "../utils";
import { useState } from "react";

const SigninPage = ({handleLogin}) => {
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
          handleLogin();
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
      <IconButton
        m={5}
        colorScheme="pink"
        size="lg"
        aria-label="Search database"
        icon={<ArrowBackIcon />}
        as={ReachLink}
        to="/"
      />

      <Flex direction="column" align="center">
        <Text fontSize={50}>Sign in</Text>
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
              {UIState === "error" && <FormHelperText color="red.500">Email or password invalid</FormHelperText>}
            </FormControl>
            <Checkbox w="300px">Remember me</Checkbox>
            <Button
              isLoading={UIState === "loading"}
              type="submit"
              colorScheme="blue"
              w="300px"
            >
              Sign in
            </Button>
            <Button as={ReachLink} w="300px">
              Sign in with Facebook
            </Button>
            <Button as={ReachLink} w="300px">
              Sign in with Google
            </Button>
          </Stack>
        </form>
        <Link as={ReachLink} to="/forgetpassword" mt={5} w="300px">
          Forget password?
        </Link>
      </Flex>
    </>
  );
};
export default SigninPage;
