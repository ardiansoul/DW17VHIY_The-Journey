import React, { useState, useEffect } from "react";
import Axios from "axios";
import JourneyCard from "./JourneyCard";

function JourneyGrid() {
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
    // if (query !== "") {
    //   journeyData.filter((journey) => {
    //     return journey.includes(query);
    //   });
    // } else {
    <JourneyCard
      id={journey.id}
      title={journey.title}
      description={journey.description}
    />
  ));
  return (
    <div>
      <h3>Journey</h3>
      <div className="search">
        <input
          type="text"
          name="search"
          value={query}
          onChange={handleChange}
        />
        <button
          onClick={() => {
            setUrl(`http://localhost:5000/api/v1/journey?query=${query}`);
          }}
        />
      </div>
      {isLoading ? <h3>Loading...</h3> : <div>{list}</div>}
    </div>
  );
}

export default JourneyGrid;
