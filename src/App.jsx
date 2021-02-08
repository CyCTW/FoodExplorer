import { MapProvider } from "./component/MapContext";
import LoginPage from "./LoginPage";
import { BrowserRouter, Redirect, Route, Switch, useHistory } from "react-router-dom";
import SignupPage from "./SignupPage";
import SigninPage from "./SigninPage";
import SearchPage from "./UserMainPage/SearchPage";
import Nav from "./component/Nav";
import { createTodo, createUser, decodeToken, readAll } from "./utils";
import { useEffect, useState } from "react";
import { AuthConfirm, AuthGetJWT, AuthLogin } from "./component/Auth";

function App() {
  const [token, setToken] = useState(null);
  const [JWTtoken, setJWTtoken] = useState(null);
  const [isLogin ,setIsLogin] = useState(false)

  const onFindToken = ({ token }) => {
    setToken(token);
  };
  const history = useHistory();

  // Check #confirm_token exists
  useEffect(async () => {

    console.log("token", token);
    if (token !== null) {
      // await AuthConfirm({ token });
      // const tokenJWT = await AuthGetJWT();
      const tokenJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTI4MDY3MTgsInN1YiI6ImI4ZjIzYzcyLWI3MTAtNGQ0Zi1hM2I2LWM5NjRjZmZhMGE3NyIsImVtYWlsIjoieXVhYW5ubl8xOTIuY3MwNkBnMi5uY3R1LmVkdS50dyIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIn0sInVzZXJfbWV0YWRhdGEiOnt9fQ.4AysD2C7hR-4kX7do4uglZz96M6p6E4TxR6OylqJWW4";
      setJWTtoken(tokenJWT);
      console.log("token: ", tokenJWT);
      const response = await createUser({ userId: tokenJWT });
      console.log("resp", response);
      setIsLogin(true)
    } else {
      decodeToken({ onFindToken });
    }
  }, [token]);

  
  return (
    <MapProvider>
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route key="0" path="/" exact>
            {isLogin && JWTtoken? <Redirect to={`/user/${JWTtoken}`} />:<LoginPage />  }
          </Route>
          <Route key="1" path="/signin" exact>
            <SigninPage />
          </Route>
          <Route key="2" path="/signup">
            <SignupPage />
          </Route>
          <Route key="3" path="/user/:userId">
            <SearchPage />
          </Route>
          <Route key="4" path="/confirm">
            <div>Please see your email!</div>
          </Route>
        </Switch>
      </BrowserRouter>
    </MapProvider>
  );
}

export default App;
