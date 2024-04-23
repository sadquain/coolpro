import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  const idToken = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/auth/signin", state: { from: props.location } }}
          />
        )
      }
    />
  );
};
export default PrivateRoute;
