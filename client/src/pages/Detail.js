import React from "react";
import Navbar from "../components/Navbar";

function Detail({
  setShowModalLogin,
  setShowModalRegister,
  showModalLogin,
  showModalRegister,
}) {
  return (
    <div>
      <Navbar
        setShowModalLogin={setShowModalLogin}
        setShowModalRegister={setShowModalRegister}
        showModalLogin={showModalLogin}
        showModalRegister={showModalRegister}
      />
      <h1> Detail </h1>
    </div>
  );
}

export default Detail;
