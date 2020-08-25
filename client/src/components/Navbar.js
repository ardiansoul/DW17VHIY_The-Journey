import React, { useContext } from "react";
import { authContext } from "../context/auth";
import Avatar from "./Avatar";

function Navbar({
  showModalLogin,
  showModalRegister,
  setShowModalLogin,
  setShowModalRegister,
}) {
  const { isLogin } = useContext(authContext);
  return (
    <>
      <h3>navbar</h3>
      {isLogin ? (
        <Avatar />
      ) : (
        <div>
          <button
            onClick={() => {
              setShowModalRegister(false);
              setShowModalLogin(!showModalLogin);
            }}
          >
            showLogin
          </button>
          <button
            onClick={() => {
              setShowModalLogin(false);
              setShowModalRegister(!showModalRegister);
            }}
          >
            showregister
          </button>
        </div>
      )}
    </>
  );
}

export default Navbar;
