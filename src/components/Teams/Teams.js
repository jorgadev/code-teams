import React, { useEffect, useState } from "react";
import TeamSquare from "./TeamSquare";
import CreateTeam from "./CreateTeam";
import Team from "./Team";

import { useAuth, AuthProvider } from "../../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";

export default function Teams({ activeUser }) {
  const [userTeams, setUserTeams] = useState(null);
  const { getTeams } = useAuth();
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (activeUser) {
      getTeams(activeUser).then((res) => {
        setUserTeams(res);
        setFetched(true);
      });
    }
  }, []);

  const TeamsIndex = () => {
    return (
      <div className="Teams">
        <h3>Teams</h3>
        <hr />
        {activeUser && (
          <>
            {fetched ? (
              <div className="d-flex justify-content-center justify-content-md-start align-items-center flex-wrap">
                {userTeams &&
                  userTeams.map((team) => (
                    <Link
                      key={team.id}
                      style={{ textDecoration: "none", color: "inherit" }}
                      to={`/teams/${team.id}`}
                    >
                      <TeamSquare key={team.id} team={team} />
                    </Link>
                  ))}
                <CreateTeam
                  activeUser={activeUser}
                  setUserTeams={setUserTeams}
                />
              </div>
            ) : (
              <Spinner
                animation="border"
                variant="primary"
                className="spinner"
              />
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/teams" component={TeamsIndex} />
          <Route path="/teams/:team">
            <Team activeUser={activeUser} />
          </Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
}
