import React from "react";
import { Link } from "react-router-dom";

function JourneyCard({ id, title, description }) {
  return (
    <Link to={`/detail/${id}`}>
      <div>
        <h5>{title}</h5>
        {description}
      </div>
    </Link>
  );
}

export default JourneyCard;
