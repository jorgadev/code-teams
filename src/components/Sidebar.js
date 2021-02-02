import React from "react";
import { NavLink } from "react-router-dom";

import HomeIcon from "@material-ui/icons/Home";
import GroupIcon from "@material-ui/icons/Group";
import ListIcon from "@material-ui/icons/List";
import SettingsIcon from "@material-ui/icons/Settings";

export default function Sidebar() {
  return (
    <div className="Sidebar">
      <div className="d-flex flex-column h-100 position-relative wrapper">
        <NavLink
          className="icon-block"
          activeClassName="selected"
          activeStyle={{ backgroundColor: "#002656", color: "#fff" }}
          to="/dashboard"
        >
          <HomeIcon className="side-icon" />
        </NavLink>
        <NavLink
          className="icon-block"
          activeClassName="selected"
          activeStyle={{ backgroundColor: "#002656", color: "#fff" }}
          to="/teams"
        >
          <GroupIcon className="side-icon" />
        </NavLink>
        <NavLink
          className="icon-block"
          activeClassName="selected"
          activeStyle={{ backgroundColor: "#002656", color: "#fff" }}
          to="/projects"
        >
          <ListIcon className="side-icon" />
        </NavLink>
        <NavLink
          className="icon-block settings-icon"
          activeClassName="selected"
          activeStyle={{ backgroundColor: "#002656", color: "#fff" }}
          to="/settings"
        >
          <SettingsIcon className="side-icon" />
        </NavLink>
      </div>
    </div>
  );
}
