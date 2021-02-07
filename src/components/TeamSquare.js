import React from "react";

export default function TeamSquare(props) {
  return (
    <div className="Team d-flex flex-column justify-content-center align-items-center mr-3 mt-3">
      <img className="team-logo" src={props.team.picture} alt="Team logo" />
      <h3 className="lead mt-3">{props.team.name}</h3>
    </div>
  );
}
