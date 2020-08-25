import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { authContext } from "./context/auth";
import Login from "./components/Login";

function PrivateRoute({ component: Component, ...rest }) {
  const { isLogin } = useContext(authContext);

  return (
    <Route
      {...rest}
      render={(props) => (isLogin ? <Component {...props} /> : <Login />)}
    />
  );
}

export default PrivateRoute;
