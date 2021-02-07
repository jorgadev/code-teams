import Subnavbar from "./Subnavbar";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Teams from "./Teams";
import Projects from "./Projects";
import Settings from "./Settings";
import Navbar from "./Navbar";

import { useAuth } from "../contexts/AuthContext";

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function Index() {
  // Get "currentUser" which presents all data about user from database (big object) from context
  const { currentUser, getActiveUser } = useAuth();
  const [activeUser, setActiveUser] = useState();

  // On first component render with "getActiveUser" function find logged in user by passing his id ([0] is just if it returns more than one)
  useEffect(() => {
    getActiveUser(currentUser.uid).then((res) => setActiveUser(res[0]));
  }, [currentUser]);

  // Render components on index page just if activeUser is fetched and created
  // With react routers create routes for every view on page
  return (
    <div className="Index">
      {activeUser && (
        <>
          <Navbar showLogout={true} />
          <Subnavbar message="back-icon" username={activeUser.username} />
          <main className="d-flex">
            <Router>
              <Sidebar />
              <div className="w-100 bg-white wrapper p-3">
                <Switch>
                  <Route exact path="/dashboard">
                    <Dashboard />
                  </Route>
                  <Route path="/teams">
                    <Teams activeUser={activeUser} />
                  </Route>
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
        </>
      )}
    </div>
  );
}
