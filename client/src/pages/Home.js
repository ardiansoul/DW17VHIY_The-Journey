import React from "react";
import Navbar from "../components/Navbar";
import JourneyGrid from "../components/JourneyGrid";

function Home({
  showModalLogin,
  showModalRegister,
  setShowModalLogin,
  setShowModalRegister,
}) {
  return (
    <div>
      <Navbar
        setShowModalLogin={setShowModalLogin}
        setShowModalRegister={setShowModalRegister}
        showModalLogin={showModalLogin}
        showModalRegister={showModalRegister}
      />
      <h1> Home </h1>

      <JourneyGrid />
    </div>
  );
}

export default Home;
