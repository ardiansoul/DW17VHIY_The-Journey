import React, { useState, useEffect } from "react";
import Axios from "axios";
import JourneyCard from "./JourneyCard";

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

  let filteredData = journeyData.filter((journey) => {
    return journey.title.includes(query);
  });

  const list = filteredData.map((journey) => (
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
        <h3>Loading...</h3>
      ) : (
        <div className="journey-grid">{list}</div>
      )}
    </div>
  );
}

export default JourneyGrid;
