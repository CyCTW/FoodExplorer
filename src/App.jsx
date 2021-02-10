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
  const [token, setToken] = useState(null);
  const [JWTtoken, setJWTtoken] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  const onFindToken = ({ token }) => {
    setToken(token);
  };
  const history = useHistory();

  // Check #confirm_token exists
  useEffect(async () => {
    console.log("token", token);
    if (token !== null) {
      await AuthConfirm({ token });
      const tokenJWT = await AuthGetJWT();
      setJWTtoken(tokenJWT);
      console.log("token: ", tokenJWT);
      const response = await createUser({ userId: tokenJWT });
      console.log("confirm successful!, resp", response);
      setIsLogin(true);
    } else {
      decodeToken({ onFindToken });
    }
  }, [token]);

  const handleLogout = () => {
    AuthLogout()
      .then((resp) => {
        setIsLogin(false);
        history.push("/")
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleLogin = () => {
    setIsLogin(true);
  }
  console.log({isLogin})
  return (
    <MapProvider>
      <BrowserRouter>
        <Nav isLogin={isLogin} handleLogout={handleLogout} />
        <Switch>
          <Route key="0" path="/" exact>
            {isLogin && JWTtoken ? (
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
