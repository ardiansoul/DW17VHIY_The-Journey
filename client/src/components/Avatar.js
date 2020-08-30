import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { image } from "../images/avatar.jpg";

function Avatar() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setShowDropdown(!showDropdown);
        }}
        className="avatar btn"
      >
        {image ? (
          <img src={image} alt="avatar" />
        ) : (
          <FontAwesomeIcon icon={faUser} />
        )}
      </button>

      {showDropdown && <Dropdown />}
    </div>
  );
}

export default Avatar;
