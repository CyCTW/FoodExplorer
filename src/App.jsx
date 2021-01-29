import { MapProvider } from "./component/MapContext";
import { Key } from "./key";
import LoginPage from "./LoginPage";
import UserMainPage from "./UserMainPage";
import SearchPage from "./UserMainPage/SearchPage";
import {
  BrowserRouter,
  Link as ReachLink,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import SignupPage from "./SignupPage";
import SigninPage from "./SigninPage";
function App() {
  // add lat and lng attribute in child component of GoogleMapReact
  return (
    <MapProvider>
      <BrowserRouter>
        <Switch>
          <Route key="0" path="/" exact>
            <LoginPage />
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
        </Switch>
      </BrowserRouter>
    </MapProvider>
  );
}

export default App;
