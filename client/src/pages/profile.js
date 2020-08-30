import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Axios from "axios";
import JourneyCard from "../components/JourneyCard";
import avatar from "../images/avatar.jpg";

function Profile() {
  const [JourneyData, setJourneyData] = useState([]);
  const [ProfileData, setProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const userId = 1;
  const token = localStorage.token;
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
    <>
      <Navbar />
      <div className="section">
        <h1> Profile </h1>
        <div className="profile">
          <img className="avatar profile-image" src={avatar} alt="avatar" />
          <h3 className="profile-title">{ProfileData.fullName}</h3>
        </div>
        {isLoading ? (
          <h3>Loading...</h3>
        ) : (
          <div className="journey-grid">{list}</div>
        )}
      </div>
    </>
  );
}

export default Profile;
