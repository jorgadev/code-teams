import React from "react";
import AddUser from "./AddUser";
import UsersList from "./UsersList";

import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function TeamSettings({ team }) {
  const { deleteTeamFromDb } = useAuth();
  const history = useHistory();

  const deleteTeamHandler = (id) => {
    deleteTeamFromDb(id).then(() => {
      history.push("/dashboard");
    });
  };

  return (
    <>
      {team && (
        <div className="TeamSettings">
          <div className="settings-sidebar px-3 py-5">
            <div
              className="team-logo d-flex justify-content-center align-items-center text-white font-weight-light"
              style={{ backgroundColor: team.color }}
              alt="Team logo"
            >
              {team.name.slice(0, 2).toUpperCase()}
            </div>
            <h3 className="text-center lead mt-3">{team.name}</h3>
            <hr className="my-3" />
            <AddUser team={team} />
            <hr className="my-3" />
            <h3>Participants:</h3>
            <UsersList team={team} />
          </div>
          <div className="settings-main">
            <button onClick={() => deleteTeamHandler(team.id)}>
              Delete team
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// podesavanja:
// - moći promijeniti ime tima
// - moči izbrisati tim
