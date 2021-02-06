import React, { useEffect } from "react";
import Team from "./Team";
import CreateTeam from "./CreateTeam";

export default function Teams({ activeUser }) {
  return (
    <div className="Teams">
      <h3>Teams</h3>
      <hr className="mb-3" />
      <Team />
      {activeUser && <CreateTeam activeUser={activeUser} />}
    </div>
  );
}
