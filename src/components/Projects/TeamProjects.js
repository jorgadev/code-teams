import React, { useState, useEffect } from "react";
import ProjectModal from "./ProjectModal";
import { Accordion, Card } from "react-bootstrap";

import { useAuth } from "../../contexts/AuthContext";

export default function TeamProjects({ team, activeUser }) {
  const [projects, setProjects] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const { getProjectsByTeamId, getTodosByProjectId } = useAuth();
  const [todos, setTodos] = useState([]);
  let projectsDOM = null;

  useEffect(() => {
    getProjectsByTeamId(team.id).then((res) => {
      if (res.length > 0) {
        projectsDOM = res.map((project) => {
          getTodosByProjectId(project.id).then((res) => {
            todos.push(res);
          });
        });
      }
    });
  }, [modalShow]);

  return (
    <div className="TeamProjects">
      {projects && <>{JSON.stringify(todos)}</>}
      <div className="add-projects-wrapper">
        {activeUser.id === team.creator && (
          <>
            <button variant="primary" onClick={() => setModalShow(true)}>
              Launch vertically centered modal
            </button>
          </>
        )}
        <ProjectModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          setModalShow={setModalShow}
          modalShow={modalShow}
          team={team}
          setProjects={setProjects}
        />
      </div>
    </div>
  );
}
