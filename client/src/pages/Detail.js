import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import background from "../images/background.jpg";
import Axios from "axios";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import moment from "moment/moment";
// moment().format();

function Detail({
  setShowModalLogin,
  setShowModalRegister,
  showModalLogin,
  showModalRegister,
  // match,
}) {
  const [journeyData, setJourneyData] = useState({
    title: "",
    description: "",
    createdAt: "",
    User: {},
  });
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  // const { id } = match.params;
  // console.log(match);
  console.log(id);
  // const id = 2;
  useEffect(() => {
    const fetchdata = async () => {
      setIsLoading(true);
      const journeyData = await Axios({
        method: "GET",
        url: `http://localhost:5000/api/v1/journey/${id}`,
      });
      console.log(journeyData.data.data.User);
      setJourneyData(journeyData.data.data);
      setIsLoading(false);
    };
    fetchdata();
    console.log(journeyData);
    // console.log(journeyData.user);
  }, []);

  const date = moment(journeyData.createdAt).format("DD MMMM YYYY");

  return (
    <>
      <Navbar
        setShowModalLogin={setShowModalLogin}
        setShowModalRegister={setShowModalRegister}
        showModalLogin={showModalLogin}
        showModalRegister={showModalRegister}
      />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="detail section">
          <div className="detail-header">
            <span className="detail-user">{journeyData.User.fullName}</span>
            <h1 className="detail-title">{journeyData.title}</h1>
            <p className="detail-date">{date}</p>
          </div>
          {/* <img src={background} alt="journey" className="detail-image" /> */}
          <div className="detail-desc">{parse(journeyData.description)}</div>
        </div>
      )}
    </>
  );
}

export default Detail;
