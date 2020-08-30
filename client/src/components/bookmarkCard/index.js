import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { authContext } from "../../context/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import parse from "html-react-parser";

function BookmarkCard({ id, title, image, description, fetchHandle }) {
  const [error, setError] = useState(false);
  const { userId } = useContext(authContext);
  const [bookmark, setBookmark] = useState({
    userId: userId,
    journeyId: id,
  });
  console.log(bookmark);
  useEffect(() => {
    setBookmark({
      journeyId: id,
      userId: userId,
    });
  }, [userId]);
  function handleBookmark() {
    const bookmarked = async () => {
      try {
        const result = await Axios({
          method: "DELETE",
          url: `http://localhost:5000/api/v1/bookmark/${bookmark.journeyId}`,
          data: bookmark,
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        console.log(result.data);
      } catch (err) {
        setError(err.response);
        console.log(error);
      }
    };
    bookmarked();
    fetchHandle();
    // setRefatch(!reFatch);
  }

  return (
    <div className="journey-card">
      <button onClick={handleBookmark} className="btn journey-card-bookmark">
        <FontAwesomeIcon icon={faBookmark} />
      </button>

      <Link to={`/detail/${id}`} className="journey-card-content">
        <div className="journey-card-desc">{parse(description)}</div>
        <h4 className="journey-card-title">{title}</h4>
      </Link>
    </div>
  );
}

export default BookmarkCard;
