import React, { useState, useEffect, useRef } from "react";
import ProjectModal from "./ProjectModal";
import Todo from "./Todo";
import {
  Button,
  ListGroup,
  Popover,
  OverlayTrigger,
  Form,
} from "react-bootstrap";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import { useAuth } from "../../contexts/AuthContext";

export default function TeamProjects({ team, activeUser }) {
  const [projects, setProjects] = useState();
  const [projectsDOM, setProjectsDOM] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const { getProjectsByTeamId, getTodosByProjectId } = useAuth();

  useEffect(() => {
    getProjectsByTeamId(team.id).then((res) => {
      const projects = res;
      const newProjectsDOM = [...projectsDOM];
      projects.forEach((project) => {
        getTodosByProjectId(project.id).then((todos) => {
          newProjectsDOM.push({ name: project.name, todos: todos });
        });
      });
      setProjectsDOM(newProjectsDOM);
    });
  }, []);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Add Todo</Popover.Title>
      <Popover.Content>
        <Form>
          <Form.Group>
            <Form.Control type="text" />
          </Form.Group>
        </Form>
      </Popover.Content>
    </Popover>
  );

  return (
    <div className="TeamProjects">
      {projectsDOM.length > 0 ? (
        projectsDOM.map((project) => {
          return (
            <div className="project-wrapper mb-5" key={project.id}>
              <span>
                <strong>{project.name}</strong>
              </span>
              {project.todos.map((todo, idx) => {
                return (
                  <ListGroup>
                    <Todo
                      view={activeUser.id === team.creator ? "admin" : "user"}
                      todo={todo}
                      idx={idx}
                      projectsDOM={projectsDOM}
                      setProjectsDOM={setProjectsDOM}
                    />
                  </ListGroup>
                );
              })}
              {activeUser.id === team.creator && (
                <div className="d-flex justify-content-center mt-3">
                  <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={popover}
                  >
                    <AddCircleIcon className="add-circle-icon" />
                  </OverlayTrigger>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p className="text-center lead">There are no projects.</p>
      )}
      <div className="add-projects">
        {activeUser.id === team.creator && (
          <>
            <Button
              variant="primary"
              className="add-project btn btn-primary my-4"
              onClick={() => setModalShow(true)}
            >
              + New Project
            </Button>
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
