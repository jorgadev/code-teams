import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

import { Tabs, Tab } from "react-bootstrap";

export default function Team() {
  const teamId = window.location.href.split("/teams/")[1];
  const [team, setTeam] = useState();
  const { getTeamById } = useAuth();
  const [key, setKey] = useState("home");

  useEffect(() => {
    getTeamById(teamId).then((res) => setTeam(res[0]));
  }, []);

  return (
    <>
      {team && (
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="home" title="Chat">
            <p>chat</p>
          </Tab>
          <Tab eventKey="profile" title="Projects">
            <p>projects</p>
          </Tab>
          <Tab eventKey="contact" title="Settings">
            <p>settings</p>
          </Tab>
        </Tabs>
      )}
    </>
  );
}
