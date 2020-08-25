import React, { useState } from "react";
import Dropdown from "./Dropdown";

function Avatar() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setShowDropdown(!showDropdown);
        }}
      >
        Avatar
      </button>
      {showDropdown && <Dropdown />}
    </div>
  );
}

export default Avatar;
