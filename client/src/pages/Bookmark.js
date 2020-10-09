import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import BookmarkCard from "../components/bookmarkCard";
import Axios from "axios";
import { authContext } from "../context/auth";
import Footer from "../components/Footer";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

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
  console.log(BookmarkData);

  return (
    <>
      <Navbar />
      <div className="section">
        <h1 className="bookmark-title">Bookmark</h1>
        {isLoading ? (
          // <h3>Loading...</h3>
          <SkeletonTheme color="#bdc3c7" highlightColor="#95a5a6">
            <div className="loading-skeleton">
              <Skeleton width={300} height={150} />
              <Skeleton width={300} height={40} />
              <Skeleton width={300} height={100} />
            </div>
            <div className="loading-skeleton">
              <Skeleton width={300} height={150} />
              <Skeleton width={300} height={40} />
              <Skeleton width={300} height={100} />
            </div>
            <div className="loading-skeleton">
              <Skeleton width={300} height={150} />
              <Skeleton width={300} height={40} />
              <Skeleton width={300} height={100} />
            </div>
          </SkeletonTheme>
        ) : BookmarkData.length != 0 ? (
          <div className="bookmark-grid">{list}</div>
        ) : (
          <div className="empty-alert">No Journeys have been Bookmarked</div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Bookmark;
