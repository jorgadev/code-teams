import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Subnavbar from "./Subnavbar";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Teams from "./Teams";
import Projects from "./Projects";
import Settings from "./Settings";
import Navbar from "./Navbar";
import { useAuth } from "../contexts/AuthContext";

export default function Index() {
  const { currentUser, getActiveUser } = useAuth();
  const [activeUser, setActiveUser] = useState();

  useEffect(() => {
    getActiveUser(currentUser.uid).then((res) => setActiveUser(res[0]));
  }, [currentUser]);

  return (
    <div className="Index">
      <Navbar showButtons={activeUser ? "out" : "in"} />
      {activeUser && (
        <Subnavbar message="back-icon" username={activeUser.username} />
      )}
      <main className="d-flex">
        <Router>
          <Sidebar />
          <div className="w-100 bg-white wrapper p-3">
            <Switch>
              <Route exact path="/dashboard">
                <Dashboard />
              </Route>
              {activeUser && (
                <Route path="/teams">
                  <Teams activeUser={activeUser} />
                </Route>
              )}

              <Route path="/projects">
                <Projects />
              </Route>
              <Route path="/settings">
                <Settings user={activeUser} />
              </Route>
            </Switch>
          </div>
        </Router>
      </main>
    </div>
  );
}
