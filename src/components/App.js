import React from "react";
import Signup from "./Auth/Signup";
import Index from "./Index";
import Login from "./Auth/Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./Auth/ForgotPassword";
import LandingPage from "./LandingPage";

import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <PrivateRoute path="/dashboard" component={Index} />
            <PrivateRoute path="/teams" component={Index} forceRefres={true} />
            <PrivateRoute path="/projects" component={Index} />
            <PrivateRoute path="/settings" component={Index} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
