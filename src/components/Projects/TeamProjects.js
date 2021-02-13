import React, { useState, useEffect } from "react";
import ProjectModal from "./ProjectModal";
import { Accordion, Card } from "react-bootstrap";

import { useAuth } from "../../contexts/AuthContext";

export default function TeamProjects({ team, activeUser }) {
  const [projects, setProjects] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const { getProjectsByTeamId } = useAuth();

  useEffect(() => {
    getProjectsByTeamId(team.id).then((res) => {
      setProjects(res);
    });
  }, [modalShow]);

  return (
    <div className="TeamProjects">
      {projects.length > 0
        ? projects.map((project) => (
            <>
              <div className="project-wrapper">
                <h3 className="mb-3">{project.name}</h3>
                <Accordion defaultActiveKey="0">
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                      Click me!
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>{JSON.stringify(project)}</Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                      Click me!
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>Hello! I'm another body</Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>
            </>
          ))
        : null}
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
