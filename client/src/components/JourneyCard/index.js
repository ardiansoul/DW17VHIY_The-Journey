import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { authContext } from "../../context/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import parse from "html-react-parser";

function JourneyCard({
  setShowModalLogin,
  showModalLogin,
  id,
  title,
  image,
  description,
}) {
  const { isLogin, userId } = useContext(authContext);
  const [bookmark, setBookmark] = useState({
    userId: userId,
    journeyId: id,
  });
  const [error, setError] = useState("");
  useEffect(() => {
    setBookmark({
      journeyId: id,
      userId: userId,
    });
  }, [userId]);

  function handleBookmark() {
    if (isLogin === false) {
      console.log("login");
      setShowModalLogin(!showModalLogin);
    } else {
      const fetchdata = async () => {
        try {
          const result = await Axios({
            method: "POST",
            url: "http://localhost:5000/api/v1/bookmark",
            data: bookmark,
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          });
          console.log(result.data.data);
          console.log("bookmarked");
          setBookmark(result.data.data);
        } catch (err) {
          setError(err.response);
          console.log(error);
        }
      };
      fetchdata();
    }
  }

  return (
    <div className="journey-card">
      {/* {error ? (
        <span className="journey-alert">Bookmarked</span>
      ) : ( */}
      <button onClick={handleBookmark} className="btn journey-card-bookmark">
        <FontAwesomeIcon icon={faBookmark} />
      </button>
      {/* )} */}
      <Link to={`/detail/${id}`} className="journey-card-content">
        <div className="journey-card-desc">{parse(description)}</div>
        <h4 className="journey-card-title">{title}</h4>
      </Link>
    </div>
  );
}

export default JourneyCard;
