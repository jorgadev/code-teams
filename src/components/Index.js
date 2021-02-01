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
    <div className="Index">
      <Subnavbar message="back-icon" />
      <main className="d-flex">
        <Router>
          <Sidebar />
          <div className="w-100 bg-white wrapper py-1 px-3">
            <Switch>
              <Route exact path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/teams">
                <Teams />
              </Route>
              <Route path="/projects">
                <Projects />
              </Route>
              <Route path="/settings">
                <Settings />
              </Route>
            </Switch>
          </div>
        </Router>
      </main>
    </div>
  );
}
