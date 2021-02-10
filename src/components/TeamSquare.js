import React from "react";

export default function TeamSquare(props) {
  return (
    <div className="Team d-flex flex-column justify-content-center align-items-center mr-3 mt-3">
      <div
        className="team-logo d-flex justify-content-center align-items-center text-white font-weight-light"
        style={{ backgroundColor: props.team.color }}
        alt="Team logo"
      >
        {props.team.name.slice(0, 2).toUpperCase()}
      </div>
      <h3 className="lead mt-3 team-name text-center px-2">
        {props.team.name}
      </h3>
    </div>
  );
}
