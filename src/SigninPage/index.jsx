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
import { AuthGetJWT, AuthLogin } from "../component/Auth";
import { getUserFoodList } from "../utils";
import { useState } from "react";

const SigninPage = () => {
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const [] = useState();

  const onSubmit = async (data) => {
    console.log(data);
    await AuthLogin({ email: data.email, password: data.password });
    AuthGetJWT()
      .then((token) => {
        console.log("token", token);
        history.push(`/user/${token}`);
      })
      .catch((err) => {
        console.log("error occured", err);
      });
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
            <FormControl id="email" isRequired w="300px">
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                ref={register}
                placeholder="example@gmail.com"
              />
            </FormControl>
            <FormControl id="password" isRequired w="300px">
              <FormLabel>Password</FormLabel>
              <Input name="password" type="password" ref={register} />
            </FormControl>
            <Checkbox w="300px">Remember me</Checkbox>
            <Button type="submit" colorScheme="blue" w="300px">
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
