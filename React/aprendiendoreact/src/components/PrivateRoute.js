import React from "react";
import authProvider from "../utils/AuthProvider";
import { Route, Navigate } from "react-router-dom";

function PrivateRoute({ children, Component, ...other }) {
  if (authProvider.checkAuth()) {
    return;
    <Route
      {...other}
      render={(props) => {
        if (authProvider.checkAuth()) {
          return <Component {...props} />;
        }
        return <Navigate to="/login/" />;
      }}
    />;
  }
}

export default PrivateRoute;
