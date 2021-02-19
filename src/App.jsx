import MainPage from "./MainPage";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import SignupPage from "./SignupPage";
import SigninPage from "./SigninPage";
import SearchPage from "./UserMainPage/SearchPage";
import Nav from "./component/Nav";
import {  createUser, decodeToken } from "./utils";
import { useEffect, useState } from "react";
import {
  AuthConfirm,
  AuthGetJWT,
} from "./component/Auth";
import Confirm from "./component/Confirm";

function App() {
  const [confirmToken, setConfirmToken] = useState(null);
  const [JWTtoken, setJWTtoken] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  const onFindToken = ({ confirmToken }) => {
    setConfirmToken(confirmToken);
  };

  // Check #confirm_token exists
  useEffect(async () => {
    console.log("Confirmtoken", confirmToken);
    if (confirmToken !== null) {
      const confirmResponse = await AuthConfirm({ confirmToken });
      console.log("confirm response", confirmResponse)
      const tokenJWT = await AuthGetJWT();
      setJWTtoken(tokenJWT);

      console.log("JWTtoken: ", tokenJWT);

      const response = await createUser({ email: confirmResponse.email});
      console.log("confirm successful!, resp", response);
      setIsLogin(true);
    } else {
      decodeToken({ onFindToken });
    }
  }, [confirmToken]);

  const handleLogin = ({token}) => {
    setIsLogin(true);
    setJWTtoken(token);
  }
  console.log({isLogin})
  return (
      <BrowserRouter>
        <Nav isLogin={isLogin} setIsLogin={setIsLogin} />
        <Switch>
          <Route key="0" path="/" exact>
            {isLogin  ? (
              <Redirect to={`/user/${JWTtoken}`} />
            ) : (
              <MainPage />
            )}
          </Route>
          <Route key="1" path="/signin" exact>
            <SigninPage handleLogin={handleLogin}/>
          </Route>
          <Route key="2" path="/signup">
            <SignupPage handleLogin={handleLogin}/>
          </Route>
          <Route key="3" path="/user/:userId">
            <SearchPage />
          </Route>
          <Route key="4" path="/confirm">
            <Confirm />
          </Route>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
