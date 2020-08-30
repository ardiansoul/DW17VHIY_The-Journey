import React from "react";
// import "./login.css";
import { useState, useContext } from "react";
import axios from "axios";
import { authContext } from "../context/auth";
import leaf from "../images/leaf.svg";
import map from "../images/map.svg";
import { useHistory, useLocation } from "react-router-dom";

// import { UserDatas } from "../../fakedatas/UserDatas";

function Login(setShowModalRegister) {
  const [inputLogin, setInputLogin] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const { setUserId, setIsLogin } = useContext(authContext);

  // const location = useLocation();
  // const history = useHistory();
  // const currentPathname = location.pathname;

  function loginChange(event) {
    setInputLogin({ ...inputLogin, [event.target.name]: event.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/login",
        inputLogin
      );
      const account = res.data.data;
      console.log(res.data.data);
      localStorage.setItem("token", account.accessToken);
      setUserId(account.id);
      setIsLogin(true);
      // history.push(currentPathname);
    } catch (err) {
      setError(err.response.data.message);
      console.log({ err }, err);
      console.log(error);
    }
  };
  return (
    <div className="modal">
      <img src={map} className="map" alt="map" />
      <img src={leaf} className="leaf" alt="leaf" />
      <div className="modal-header">
        <h5 className="modal-title">Login</h5>
        {error && <div className="modal-alert">{error}</div>}
      </div>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
        className="modal-form"
      >
        <div className="modal-body">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={inputLogin.email}
            onChange={loginChange}
            placeholder="Email"
            className="form-control"
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={inputLogin.password}
            onChange={loginChange}
            placeholder="Password"
            className="form-control"
          />
        </div>
        <div className="modal-button">
          <button type="submit" className="btn btn-register">
            Login
          </button>
          <p className="modal-login-register">
            Don't have an account? Klik{" "}
            <span
              onClick={() => {
                setShowModalRegister(true);
              }}
              style={{
                cursor: "pointer",
              }}
            >
              Here
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
