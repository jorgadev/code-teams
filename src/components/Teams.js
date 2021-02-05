import React from "react";
import Team from "./Team";
import CreateTeam from "./CreateTeam";

export default function Teams() {
  return (
    <div className="Teams">
      <h3>Teams</h3>
      <hr className="mb-3" />
      <Team />
      <CreateTeam />
    </div>
  );
}
