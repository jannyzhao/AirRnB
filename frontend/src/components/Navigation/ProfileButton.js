import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// import { createReservation } from "../../store/reservations";
import * as sessionActions from "../../store/session";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  // console.log(showReservation)

  const logout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <ul className="profile-dropdown">
        <li> {user.username}</li>
        <li>{user.email}</li>
        <li className="resLink">
          <a href="/reservations">My Reservations</a>
        </li>
        <button onClick={logout}>Sign Out</button>
        {/* <button>Demo login</button> */}
      </ul>
    </>
  );
}

export default ProfileButton;
