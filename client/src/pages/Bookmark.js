import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import JourneyCard from "../components/JourneyCard";
import Axios from "axios";

function Bookmark() {
  const [BookmarkData, setBookmarkData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userId = 1;
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchdata = async () => {
      setIsLoading(true);
      const bookmark = await Axios({
        method: "GET",
        url: `http://localhost:5000/api/v1/bookmark/${userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(bookmark.data.data);
      setBookmarkData(bookmark.data.data);
      setIsLoading(false);
    };
    fetchdata();
  }, []);

  const list = BookmarkData.map((bookmark) => (
    <JourneyCard
      id={bookmark.id}
      title={bookmark.Journey.title}
      description={bookmark.Journey.description}
    />
  ));

  return (
    <div>
      <Navbar />
      <h1> Bookmark </h1>
      {isLoading ? <h3>Loading...</h3> : <div>{list}</div>}
    </div>
  );
}

export default Bookmark;
