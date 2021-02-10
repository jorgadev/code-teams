import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

import ClearIcon from "@material-ui/icons/Clear";

// Recieve props from CreateTeam component
export default function AutoSuggestInput({ team }) {
  const { getActiveUser } = useAuth();
  // Create an blank array where all users will be added after fetch
  const [members, setMembers] = useState([]);

  useEffect(() => {
    Promise.all(
      team.members.map((memberId) =>
        getActiveUser(memberId).then((res) => res[0])
      )
    ).then((members) => setMembers(members));
  }, []);

  // Text typed into suggestions input
  const [value, setValue] = useState("");
  // All suggestions - usernames from database
  const [suggestions, setSuggestions] = useState([]);

  // Teach Autosuggest how to calculate suggestions for any given input value.
  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : members.filter(
          (user) =>
            user.username.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  return (
    <>
      {members &&
        members.map((member) => {
          return (
            <>
              <div className="member-container">
                <img
                  className="member-avatar"
                  src={member.avatar}
                  alt="Avatar"
                />
                <p>{member.username}</p>
                <ClearIcon className="remove-user" />
              </div>
            </>
          );
        })}
    </>
  );
}
