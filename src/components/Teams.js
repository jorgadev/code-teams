import React, { useEffect, useState } from "react";
import Team from "./Team";
import CreateTeam from "./CreateTeam";
import { useAuth } from "../contexts/AuthContext";

export default function Teams({ activeUser }) {
  const [userTeams, setUserTeams] = useState([]);
  const { getTeams } = useAuth();

  //On component first time render get all users and save them in array "allUsers"
  useEffect(() => {
    if (activeUser) {
      getTeams(activeUser).then((res) => setUserTeams(res));
    }
  }, []);

  return (
    <div className="Teams">
      <h3>Teams</h3>
      <hr />
      {activeUser && (
        <div className="d-flex align-items-center flex-wrap">
          {userTeams &&
            userTeams.map((team) => <Team key={team.id} team={team} />)}
          <CreateTeam activeUser={activeUser} setUserTeams={setUserTeams} />
        </div>
      )}
    </div>
  );
}
