import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../context/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPen,
  faSignOutAlt,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";

function Dropdown() {
  const { setIsLogin } = useContext(authContext);
  function logoutHandle() {
    setIsLogin(false);
    localStorage.clear();
  }

  return (
    <div>
      <ul className="dropdown-list">
        <Link to="/profile" className="dropdown-item">
          <FontAwesomeIcon icon={faUser} className="icon" />
          <span>Profile</span>
        </Link>
        <Link to="/new-journey" className="dropdown-item">
          <FontAwesomeIcon icon={faPen} className="icon" />
          <span>New Journey</span>
        </Link>
        <Link to="/bookmark" className="dropdown-item">
          <FontAwesomeIcon icon={faBookmark} className="icon" />
          <span>Bookmark</span>
        </Link>
        <Link onClick={logoutHandle} to="/" className="dropdown-item">
          <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
          <span>Logout</span>
        </Link>
      </ul>
    </div>
  );
}

export default Dropdown;
