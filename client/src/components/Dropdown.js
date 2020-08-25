import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../context/auth";

function Dropdown() {
  const { setIsLogin } = useContext(authContext);
  function logoutHandle() {
    setIsLogin(false);
    localStorage.clear();
  }

  return (
    <div>
      <ul>
        <Link to="/profile">Profile</Link>
        <Link to="/new-journey">New Journey</Link>
        <Link to="/bookmark">Bookmark</Link>
        <Link onClick={logoutHandle} to="/">
          Logout
        </Link>
      </ul>
    </div>
  );
}

export default Dropdown;
