import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Axios from "axios";
import JourneyCard from "../components/JourneyCard";

function Profile() {
  const [JourneyData, setJourneyData] = useState([]);
  const [ProfileData, setProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const userId = 1;
  const token = localStorage.getItem(token);
  useEffect(() => {
    const fetchdata = async () => {
      setIsLoading(true);

      const Profile = await Axios({
        method: "GET",
        url: `http://localhost:5000/api/v1/profile/${userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const Journey = await Axios({
        method: "GET",
        url: `http://localhost:5000/api/v1/profile/${userId}/journey`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(Journey.data.data);
      setJourneyData(Journey.data.data);
      setProfileData(Profile.data.data);
      setIsLoading(false);
    };
    fetchdata();
  }, []);

  const list = JourneyData.map((journey) => (
    <JourneyCard
      id={journey.id}
      title={journey.title}
      description={journey.description}
    />
  ));

  return (
    <div>
      <Navbar />
      <h1> Profile </h1>
      <div className="profile">
        <h3>{ProfileData.fullName}</h3>
      </div>
      {isLoading ? <h3>Loading...</h3> : <div>{list}</div>}
    </div>
  );
}

export default Profile;
