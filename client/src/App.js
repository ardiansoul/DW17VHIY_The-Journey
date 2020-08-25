import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Profile from "./pages/profile";
import Bookmark from "./pages/Bookmark";
import PrivateRoute from "./privateRoute";
import { authContext } from "./context/auth";
import Login from "./components/Login";
import Register from "./components/Register";
import newJourney from "./pages/newJourney";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalRegister, setShowModalRegister] = useState(false);

  useEffect(() => {
    setShowModalLogin(false);
    setShowModalRegister(false);
  }, [isLogin]);
  return (
    <authContext.Provider value={{ isLogin, setIsLogin }}>
      {showModalLogin && <Login />}
      {showModalRegister && <Register />}
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home
              setShowModalLogin={setShowModalLogin}
              setShowModalRegister={setShowModalRegister}
              showModalLogin={showModalLogin}
              showModalRegister={showModalRegister}
            />
          </Route>

          <Route path="/detail/:id" exact>
            <Detail
              setShowModalLogin={setShowModalLogin}
              setShowModalRegister={setShowModalRegister}
              showModalLogin={showModalLogin}
              showModalRegister={showModalRegister}
            />
          </Route>
          <PrivateRoute path="/profile" component={Profile} exact />
          <PrivateRoute path="/bookmark" component={Bookmark} exact />
          <PrivateRoute path="/new-journey" component={newJourney} exact />
        </Switch>
      </Router>
    </authContext.Provider>
  );
}

export default App;
