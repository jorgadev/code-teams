import React from "react";
import Team from "./Team";
import { db } from "../firebase";
import CreateTeam from "./CreateTeam";

export default function Teams() {
  // inserting into db
  // const teamsRef = db.ref("Teams");
  // teamsRef.push("team one");

  // getting data from db
  const dbRefObj = db.ref("Teams");
  dbRefObj.on("value", (snap) => console.log(snap.val()));
  return (
    <div className="Teams">
      <h3>Teams</h3>
      <hr className="mb-3" />
      <Team />
      <CreateTeam />
    </div>
  );
}
