import React from "react";
import AutoSuggestInput from "./AutoSuggestInput";

export default function TeamSettings({ team }) {
  return (
    <>
      {team && (
        <div className="TeamSettings">
          <div className="settings-sidebar px-3 pt-5">
            <div
              className="team-logo d-flex justify-content-center align-items-center text-white font-weight-light"
              style={{ backgroundColor: team.color }}
              alt="Team logo"
            >
              {team.name.slice(0, 2).toUpperCase()}
            </div>
            <h3 className="text-center lead mt-3">{team.name}</h3>
            <hr className="my-3" />
            <AutoSuggestInput team={team} />
          </div>
          <div className="settings-main"></div>
        </div>
      )}
    </>
  );
}

// podesavanja:
// - moći promijeniti ime tima
// - moći dodati nekog člana
// - moći izbrisati nekog (znači da mora biti lista)
// - moči izbrisati tim
