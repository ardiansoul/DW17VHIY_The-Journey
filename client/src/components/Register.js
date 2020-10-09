import React, { useContext, useState } from "react";
import { authContext } from "../context/auth";
import Axios from "axios";
import leaf from "../images/leaf.svg";
import map from "../images/map.svg";

function Register({ registerHandler }) {
  const [inputRegister, setInputRegister] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: null,
    address: "",
    image: null,
  });

  const [error, setError] = useState("");
  const { fullName, email, password, phone, address } = inputRegister;

  const { setIsLogin } = useContext(authContext);

  function registerChange(e) {
    setInputRegister({ ...inputRegister, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await Axios.post(
        "http://localhost:5000/api/v1/register",
        inputRegister
      );
      const account = res.data.data;
      console.log(res.data.data);
      localStorage.setItem("token", account.token);
      setIsLogin(true);
    } catch (err) {
      setError(err.response.data.message);
      console.log(error);
    }
  };
  return (
    <div className="modal">
      <img src={map} className="map" alt="map" />
      <img src={leaf} className="leaf" alt="leaf" />

      <div className="modal-header">
        <h5 className="modal-title">Register</h5>
        {error && <div className="modal-alert">{error}</div>}
      </div>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
        className="modal-form"
      >
        <div className="modal-body">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            name="fullName"
            value={fullName}
            onChange={registerChange}
            placeholder="Full Name"
          />
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={email}
            onChange={registerChange}
            placeholder="Email"
          />
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={registerChange}
            placeholder="password"
          />
          <label>Phone</label>
          <input
            type="number"
            className="form-control"
            name="phone"
            value={phone}
            onChange={registerChange}
            placeholder="Phone"
          />
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={address}
            onChange={registerChange}
            placeholder="address"
          />
        </div>
        <div className="modal-button">
          <button type="submit" className="btn btn-register">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
