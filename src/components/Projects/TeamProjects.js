import React, { useState, useEffect } from "react";
import ProjectModal from "./ProjectModal";
import { Accordion, Card, Spinner, Form, Button } from "react-bootstrap";

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

  return (
    <>
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
                    <Accordion
                      defaultActiveKey="0"
                      key={todo.id}
                      className="Accordion"
                    >
                      <Card>
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey={idx.toString()}
                        >
                          {idx + 1}. {todo.name}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={idx.toString()}>
                          <Card.Body>
                            <Form>
                              <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Description:</Form.Label>
                                <Form.Control
                                  as="textarea"
                                  rows={3}
                                  placeholder="Describe how did you solve a problem.."
                                />
                              </Form.Group>
                              <Form.Group>
                                <Form.Label>URL: </Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Put an URL of picture or commit you made.."
                                />
                              </Form.Group>
                              <div class="d-flex justify-content-end mt-3">
                                <Button className="btn btn-primary">
                                  Solve
                                </Button>
                              </div>
                            </Form>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  );
                })}
              </div>
            );
          })
        ) : (
          <Spinner animation="border" variant="primary" className="spinner" />
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
    </>
  );
}
