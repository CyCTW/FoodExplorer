import { MapProvider } from "./component/MapContext";
import LoginPage from "./LoginPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignupPage from "./SignupPage";
import SigninPage from "./SigninPage";
import SearchPage from "./UserMainPage/SearchPage";
import Nav from "./component/Nav";
import { createTodo, readAll } from "./utils";
import { useEffect } from "react";
function App() {
  // add lat and lng attribute in child component of GoogleMapReact
  const myTodo = {
    title: "Test Axios 2",
    completed: false,
  };
  useEffect(() => {
    createTodo(myTodo)
      .then((response) => {
        console.log("API responsed", response);
      })
      .catch((err) => {
        console.log("API error", err);
      });
    readAll()
      .then((response) => {
        console.log("Response ", response);
      })
      .catch((err) => {
        console.log("API error", err);
      });
  }, []);

  return (
    <MapProvider>
      <BrowserRouter>
        <Nav />
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
