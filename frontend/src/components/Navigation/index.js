import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import "./Navigation.css";

function Navigation() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [searchInput, setSearchInput] = useState("");
  const history = useHistory();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
      </>
    );
  }

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/?search=${searchInput.replaceAll(" ", "+")}`);
  };

  const demoLogin = (e) => {
    e.preventDefault();
    return dispatch(
      login({
        username: "Demo-lition",
        email: "demo@user.io",
        password: "password",
      })
    );
  };

  return (
    <nav className="navBar">
      <NavLink
        exact
        to="/"
        style={{
          fontSize: "16px",
          textDecoration: "none",
          fontFamily: "Montserrat",
        }}
      >
        Home
      </NavLink>

      {/* Search bar */}
      <div className="search-bar">
        <input
          onChange={(e) => setSearchInput(e.target.value)}
          type="search"
          placeholder="Plan your stay"
          value={searchInput}
          className="search-input"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="dropdown">
        <button
          className="dropdown-trigger"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          Menu
        </button>

        <ul
          className={`dropdown-menu${isDropdownOpen ? " is-active" : ""}`}
          onClick={() => setIsDropdownOpen(false)}
        >
          <li>
            {sessionUser && <ProfileButton user={sessionUser} />}
            {!sessionUser && (
              <>
                <LoginFormModal />
                {/* <NavLink to="/signup"></NavLink> */}
              </>
            )}
          </li>
          {!sessionUser && (
            <li>
              <SignupFormModal />
            </li>
          )}
          {/* <li>Demo Login</li> */}

          {!sessionUser && <button onClick={demoLogin}> Demo Login</button>}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
