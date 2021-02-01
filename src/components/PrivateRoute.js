import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Get a current route, rename it to Component with all props (...rest) and check if currentUser is defined, if not redirect to login page
export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
