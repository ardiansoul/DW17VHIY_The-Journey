import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import JourneyGrid from "../components/JourneyGrid";
import HeroImage from "../components/HeroImage";
import { authContext } from "../context/auth";

function Home({
  showModalLogin,
  showModalRegister,
  setShowModalLogin,
  setShowModalRegister,
}) {
  const { isLogin } = useContext(authContext);
  return (
    <div>
      <Navbar
        setShowModalLogin={setShowModalLogin}
        setShowModalRegister={setShowModalRegister}
        showModalLogin={showModalLogin}
        showModalRegister={showModalRegister}
      />
      {!isLogin ? <HeroImage /> : ""}
      <JourneyGrid
        showModalLogin={showModalLogin}
        setShowModalLogin={setShowModalLogin}
      />
    </div>
  );
}

export default Home;
