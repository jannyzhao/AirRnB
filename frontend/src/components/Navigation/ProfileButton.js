import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  // const openMenu = () => {
  //     if (showMenu) return;
  //     setShowMenu(true);
  // };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

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
        <button onClick={logout}>Sign Out</button>
      </ul>
    </>
  );
}

export default ProfileButton;
