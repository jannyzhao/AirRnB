import React from "react";
import { Route, Switch } from "react-router-dom";
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
      </Switch>
    </>
  );
}

export default App;