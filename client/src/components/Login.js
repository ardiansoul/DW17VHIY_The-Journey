import React from "react";
// import "./login.css";
import { useState, useContext } from "react";
import axios from "axios";
import { authContext } from "../context/auth";

// import { UserDatas } from "../../fakedatas/UserDatas";

function Login(setShowModalRegister) {
  const [inputLogin, setInputLogin] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const { setIsLogin } = useContext(authContext);

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
      setIsLogin(true);
    } catch (err) {
      setError(err.response);
      console.log({ err }, err);
      console.log(setError);
    }
  };
  return (
    <div className="modal-login">
      <img
        src={process.env.PUBLIC_URL + "/images/hibicus.svg"}
        className="hibicus"
        alt="hibicus"
      />
      <img
        src={process.env.PUBLIC_URL + "/images/palm.svg"}
        className="palm"
        alt="palm"
      />
      <div className="modal-content">
        <div className="modal-login-header">
          <h5 className="modal-login-title">Login</h5>
          {error && <div className="alert alert-danger m-4">{error}</div>}
        </div>
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
          className="form-group modal-login-form"
        >
          <div className="modal-login-body">
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
          <button type="submit" className="yellow my-2 btn btn-block">
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
        </form>
      </div>
    </div>
  );
}

export default Login;
