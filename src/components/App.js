import React from "react";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import LandingPage from "./LandingPage";
import Navbar from "./Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={LandingPage} />
          </Switch>
        </AuthProvider>
      </Router>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
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
