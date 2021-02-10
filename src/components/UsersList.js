import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

import ClearIcon from "@material-ui/icons/Clear";

// Recieve props from CreateTeam component
export default function AutoSuggestInput({ team }) {
  const { getActiveUser, removeUserFromTeam, getTeamById } = useAuth();
  // Create an blank array where all users will be added after fetch
  const [members, setMembers] = useState([]);

  const removeUserHandler = async (id) => {
    const newArray = members
      .filter((member) => member.id !== id)
      .map((member) => member.id);
    await removeUserFromTeam(team.id, newArray).then(() => {});
  };

  useEffect(() => {
    getTeamById(team.id).then((res) => {
      Promise.all(
        res[0].members.map((memberId) =>
          getActiveUser(memberId).then((res) => res[0])
        )
      ).then((members) => setMembers(members));
    });
  }, [members]);

  return (
    <>
      {members &&
        members.map((member) => {
          return (
            <div className="member-container" key={member.id}>
              <img className="member-avatar" src={member.avatar} alt="Avatar" />
              <p>{member.username}</p>
              {member.id !== team.creator ? (
                <ClearIcon
                  className="remove-user"
                  onClick={() => removeUserHandler(member.id)}
                />
              ) : null}
            </div>
          );
        })}
    </>
  );
}
