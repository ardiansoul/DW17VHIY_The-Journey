import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import Axios from "axios";
import JourneyCard from "../components/JourneyCard";
import avatar from "../images/avatar.jpg";
import { authContext } from "../context/auth";
import Footer from "../components/Footer";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Profile() {
  const { userId } = useContext(authContext);

  const [JourneyData, setJourneyData] = useState([]);
  const [ProfileData, setProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const token = localStorage.token;

  // const handleImage = async (event) => {
  //   setProfileData({ ...ProfileData, image: event.target.files[0] });

  //   await Axios({
  //     method: "PATCH",
  //     url: `http://localhost:5000/api/v1/profile/${userId}`,
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     data: ProfileData,
  //   });
  //   setRefetch(true);
  // };

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

      // console.log(Journey.data.data);
      setJourneyData(Journey.data.data);
      setProfileData(Profile.data.data);
      setRefetch(false);
      setIsLoading(false);
    };
    fetchdata();
  }, [refetch]);
  // console.log(ProfileData);

  const list = JourneyData.map((journey) => (
    // const newDesc = journey.description.substr(0, 25) + "...";
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
          <img src={avatar} alt="profile" className="avatar image-add" />
          {/* {ProfileData.image === undefined || ProfileData.image === null ? (
            <FontAwesomeIcon icon={faUser} className="avatar profile-image" />
          ) : (
            <img className="image-add" src={ProfileData.image} />
          )}

          <input type="file" onChange={handleImage} className="file-input" /> */}
          <h3 className="profile-title">{ProfileData.fullName}</h3>
          <h4 className="profile-title">{ProfileData.email}</h4>
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
        ) : (
          <div className="journey-grid">{list}</div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Profile;
