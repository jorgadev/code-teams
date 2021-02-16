import React, { useState, useEffect, useRef } from "react";
import ProjectModal from "./ProjectModal";
import Todo from "./Todo";
import { Button, Form, ListGroup, Modal } from "react-bootstrap";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import { useAuth } from "../../contexts/AuthContext";

export default function TeamProjects({ team, activeUser }) {
  const [projects, setProjects] = useState();
  const [projectsDOM, setProjectsDOM] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const {
    getProjectsByTeamId,
    getTodosByProjectId,
    createNewTodoInDb,
  } = useAuth();
  const [addTodoModalShow, setAddTodoModalShow] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [activeProject, setActiveProject] = useState(null);

  const fetchProjects = () => {
    getProjectsByTeamId(team.id).then((res) => {
      const projects = res;
      const newProjectsDOM = [...projectsDOM];
      projects.forEach((project) => {
        getTodosByProjectId(project.id).then((todos) => {
          newProjectsDOM.push({
            name: project.name,
            todos: todos,
            id: project.id,
          });
        });
      });
      setProjectsDOM(newProjectsDOM);
    });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleClose = (projectId) => {
    setAddTodoModalShow(true);
    if (newTodo !== "") {
      createNewTodoInDb(newTodo, activeProject);
    }
    setAddTodoModalShow(false);
  };
  const handleShow = (projectId) => {
    setAddTodoModalShow(true);
    setActiveProject(projectId);
  };

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
                  <ListGroup key={todo.id}>
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
                  <AddCircleIcon
                    className="add-circle-icon"
                    onClick={() => {
                      handleShow(project.id);
                    }}
                  />
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
        <Modal show={addTodoModalShow} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add todo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Todo:</Form.Label>
              <Form.Control
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
