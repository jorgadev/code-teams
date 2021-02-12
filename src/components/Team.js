import React, { useState, useEffect } from "react";
import Chat from "./Chat";
import { useAuth } from "../contexts/AuthContext";
import TeamSettings from "./TeamSettings";
import TeamProjects from "./TeamProjects";

import { Tabs, Tab } from "react-bootstrap";

export default function Team({ activeUser }) {
  const teamId = window.location.href.split("/teams/")[1];
  const [team, setTeam] = useState();
  const { getTeamById } = useAuth();
  const [key, setKey] = useState("home");

  useEffect(() => {
    getTeamById(teamId).then((res) => setTeam(res[0]));
  }, []);

  return (
    <>
      {team && activeUser && (
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="home" title="Chat">
            <Chat team={team} />
          </Tab>
          <Tab eventKey="profile" title="Projects">
            <TeamProjects team={team} activeUser={activeUser} />
          </Tab>
          {activeUser.id === team.creator ? (
            <Tab eventKey="contact" title="Settings">
              <TeamSettings team={team} />
            </Tab>
          ) : null}
        </Tabs>
      )}
    </>
  );
}
