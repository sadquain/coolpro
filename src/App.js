import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AdminLayout from "layouts/Admin.js";
import Signin from "views/Signin";
import { getSession } from "./services";
import PrivateRoute from "routes/PrivateRoute";
import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const [authenticated, setAuthenticated] = useState(localStorage.getItem("user"));


  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    getSession().then(async (data) => {
      if (!data) {
      }
      setAuthenticated(true);
    });
  };

  return (
    <BrowserRouter>
    <Switch>
      <PrivateRoute
        path="/admin"
        component={AdminLayout}
        authenticated={authenticated}
      />
      <Route path="/auth/signin" component={Signin} />
      <Redirect to={authenticated ? "/admin/dashboard" : "/auth/signin"} />
    </Switch>
    </BrowserRouter>
  );
};

export default App;
