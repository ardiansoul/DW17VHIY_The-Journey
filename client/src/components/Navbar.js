import React, { useContext } from "react";
import { authContext } from "../context/auth";
import Avatar from "./Avatar";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

function Navbar({
  showModalLogin,
  showModalRegister,
  setShowModalLogin,
  setShowModalRegister,
}) {
  const { isLogin } = useContext(authContext);
  return (
    <>
      <div className="navbar">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        {isLogin ? (
          <Avatar />
        ) : (
          <div>
            <button
              className="btn btn-login"
              onClick={() => {
                setShowModalRegister(false);
                setShowModalLogin(!showModalLogin);
              }}
            >
              Login
            </button>
            <button
              className="btn btn-register"
              onClick={() => {
                setShowModalLogin(false);
                setShowModalRegister(!showModalRegister);
              }}
            >
              Register
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
