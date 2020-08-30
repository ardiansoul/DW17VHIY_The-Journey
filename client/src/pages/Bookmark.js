import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import BookmarkCard from "../components/bookmarkCard";
import Axios from "axios";
import { authContext } from "../context/auth";

function Bookmark() {
  const [BookmarkData, setBookmarkData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useContext(authContext);
  const token = localStorage.getItem("token");
  const [reFatch, setRefatch] = useState(false);

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
    setRefatch(false);
  }, [reFatch]);

  const fetchHandle = () => {
    setRefatch(true);
  };

  const list = BookmarkData.map((bookmark) => (
    <BookmarkCard
      id={bookmark.id}
      title={bookmark.Journey.title}
      description={bookmark.Journey.description}
      setRefetch={setRefatch}
      fetchHandle={fetchHandle}
    />
  ));

  return (
    <>
      <Navbar />
      <div className="section">
        <h1 className="bookmark-title">Bookmark</h1>
        {isLoading ? (
          <h3>Loading...</h3>
        ) : (
          <div className="bookmark-grid">{list}</div>
        )}
      </div>
    </>
  );
}

export default Bookmark;
