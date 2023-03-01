import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormModal from "./components/LoginFormModal";
import SignupFormModal from "./components/SignupFormModal";
import Navigation from "./components/Navigation";

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/signup">
          <SignupFormModal />
        </Route>
        <Route path="/login">
          <LoginFormModal />
        </Route>
      </Switch>
    </>
  );
}

export default App;