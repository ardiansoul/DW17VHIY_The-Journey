import React, { useState, useEffect } from "react";
import Axios from "axios";
import JourneyCard from "./JourneyCard";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function JourneyGrid({ setShowModalLogin, showModalLogin }) {
  const [journeyData, setJourneyData] = useState([]);
  const [query, setQuery] = useState("");
  const [url, setUrl] = useState("http://localhost:5000/api/v1/journey");
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(event) {
    setQuery(event.target.value);
  }

  useEffect(() => {
    const fetchdata = async () => {
      setIsLoading(true);
      const result = await Axios({
        method: "GET",
        url: url,
      });

      console.log(result.data.data);
      setJourneyData(result.data.data);
      setIsLoading(false);
    };
    fetchdata();
  }, [url]);

  const list = journeyData.map((journey) => (
    <JourneyCard
      showModalLogin={showModalLogin}
      setShowModalLogin={setShowModalLogin}
      id={journey.id}
      title={journey.title}
      description={journey.description}
    />
  ));
  return (
    <div className="section">
      <h3 className="journey-title">Journey</h3>
      <div className="journey-search">
        <input
          className="search-input"
          type="text"
          name="search"
          value={query}
          onChange={handleChange}
        />
        <button
          className="btn btn-search"
          onClick={() => {
            setUrl(`http://localhost:5000/api/v1/journey?query=${query}`);
          }}
        >
          Search
        </button>
      </div>
      {isLoading ? (
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
      ) : journeyData.length != 0 ? (
        <div className="journey-grid">{list}</div>
      ) : (
        <div className="empty-alert">The Journey has not been found</div>
      )}
    </div>
  );
}

export default JourneyGrid;
