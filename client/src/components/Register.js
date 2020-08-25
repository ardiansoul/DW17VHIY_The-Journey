import React, { useContext, useState } from "react";
import { authContext } from "../context/auth";
import Axios from "axios";

function Register({ registerHandler }) {
  const [inputRegister, setInputRegister] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: null,
    address: "",
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
    <div className="modal-register">
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
          <h5 className="modal-login-title">Register</h5>
          {error && <div className="alert alert-danger m-4">{error}</div>}
        </div>
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
          className="form-group modal-login-form"
        >
          <div className="modal-login-body">
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
          <button type="submit" className="btn btn-block my-4 yellow">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
