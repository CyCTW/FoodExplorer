import { useRadio } from "@chakra-ui/react";
import GoTrue from "gotrue-js";

// Instantiate the GoTrue auth client with an optional configuration

let auth = new GoTrue({
  APIUrl: "https://foodexplorer.netlify.app/.netlify/identity",
  audience: "",
  setCookie: false,
});

export const AuthLogin = async ({ email, password }) => {
  return auth
    .login(email, password)
    .then((response) => {
      console.log("Success! Response: " + JSON.stringify({ response }));
    })
    .catch((error) => {
      console.log("Failed :( " + JSON.stringify(error));
      throw new Error(error);
    });
};

export const AuthLogout = async () => {
  const user = auth.currentUser();
  return user
    .logout()
    .then((response) => {
      console.log("User Logout");
      return response;
    })
    .catch((err) => {
      console.log("logout error", err);
      return err;
    });
};

export const AuthSignup = async ({ email, password }) => {
  return auth
    .signup(email, password)
    .then((response) => console.log("Success!Check your inbox! ", response))
    .catch((error) => console.log("It 's an error", error));
};

export const AuthConfirm = async ({ token }) => {
  return auth
    .confirm(token)
    .then((response) => {
      console.log(
        "Account confirmed!Welcome to the party!",
        JSON.stringify({ response })
      );
    })
    .catch((e) => {
      console.log(e);
    });
};

export const AuthGetJWT = async () => {
  const user = auth.currentUser();
  console.log("user", user);
  const jwt = user.jwt();
  return jwt
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log("error fetching JWT", err);
      return err;
    });
};
