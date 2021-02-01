import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Subnavbar from "./Subnavbar";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Teams from "./Teams";
import Projects from "./Projects";
import Settings from "./Settings";

export default function Index() {
  return (
    <>
      <Subnavbar message="back-icon" />
      <div className="d-flex">
        <Router>
          <Sidebar />
          <div className="p-2 w-100">
            <Switch>
              <Route exact path="/index">
                <Dashboard />
              </Route>
              <Route path="/index/teams">
                <Teams />
              </Route>
              <Route path="/index/projects">
                <Projects />
              </Route>
              <Route path="/index/settings">
                <Settings />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </>
  );
}
