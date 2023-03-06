import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import "./Navigation.css";
import { SearchIcon } from "@heroicons/react/solid";

function Navigation() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup"></NavLink>
      </>
    );
  }

  const demoLogin = (e) => {
    e.preventDefault();
    return dispatch(login({ email: "demo@user.io", password: "password" }));
  };

  return (
    <nav className="navBar">
      <NavLink exact to="/"></NavLink>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Plan your stay"
          className="search-input"
        />
        {/* <input type="text" placeholder="Check-in" class="date-input" />
        <input type="text" placeholder="Check-out" class="date-input" /> */}
        <button className="search-btn">Search</button>
        {/* <div className="flex items-center boarder-2 rounded-full">
          <SearchIcon className="h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer" />
        </div> */}
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
          {/* <NavLink exact to='/'>
                            Home
                        </NavLink> */}
          <li>
            {sessionUser && <ProfileButton user={sessionUser} />}
            {!sessionUser && (
              <>
                <LoginFormModal />
                <NavLink to="/signup"></NavLink>
              </>
            )}
          </li>
          {!sessionUser && (
            <li>
              <SignupFormModal />
            </li>
          )}
          <li>Demo Login</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
