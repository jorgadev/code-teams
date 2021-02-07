import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Team() {
  const teamId = window.location.href.split("/teams/")[1];
  const [team, setTeam] = useState();
  const { getTeamById } = useAuth();

  useEffect(() => {
    getTeamById(teamId).then((res) => setTeam(res[0]));
  }, []);

  return <div>{JSON.stringify(team)}</div>;
}
