import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormModal from "./components/LoginFormModal";
import SignupFormModal from "./components/SignupFormModal";
import Navigation from "./components/Navigation";
import ListingIndex from './components/Listings/ListingIndex';
import ListingShow from "./components/Listings/ListingShow";

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        {/* this is your homepage */}
        <Route exact path="/">
          <ListingIndex />
        </Route>  
        <Route exact path="/listings">
          <ListingIndex />
        </Route>
        <Route exact path="/listings/:listingId" component={ListingShow} />
        <Route path="/login">
          <LoginFormModal />
        </Route>
      </Switch>
    </>
  );
}

export default App;