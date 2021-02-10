import { MapProvider } from "./component/MapContext";
import LoginPage from "./LoginPage";
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
import { createTodo, createUser, decodeToken, readAll } from "./utils";
import { useEffect, useState } from "react";
import {
  AuthConfirm,
  AuthGetJWT,
  AuthLogin,
  AuthLogout,
} from "./component/Auth";
import Confirm from "./component/Confirm";

function App() {
  const [confirmToken, setConfirmToken] = useState(null);
  const [JWTtoken, setJWTtoken] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  const onFindToken = ({ confirmToken }) => {
    setConfirmToken(confirmToken);
  };
  const history = useHistory();

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
    <MapProvider>
      <BrowserRouter>
        <Nav isLogin={isLogin} setIsLogin={setIsLogin} />
        <Switch>
          <Route key="0" path="/" exact>
            {isLogin  ? (
              <Redirect to={`/user/${JWTtoken}`} />
            ) : (
              <LoginPage />
            )}
          </Route>
          <Route key="1" path="/signin" exact>
            <SigninPage handleLogin={handleLogin}/>
          </Route>
          <Route key="2" path="/signup">
            <SignupPage />
          </Route>
          <Route key="3" path="/user/:userId">
            <SearchPage />
          </Route>
          <Route key="4" path="/confirm">
            <Confirm />
          </Route>
        </Switch>
      </BrowserRouter>
    </MapProvider>
  );
}

export default App;
