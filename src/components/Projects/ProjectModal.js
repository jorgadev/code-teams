import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Alert, Form } from "react-bootstrap";
import RemoveIcon from "@material-ui/icons/Remove";
import { useAuth } from "../../contexts/AuthContext";

// Modal for project add
const ProjectModal = (props) => {
  const [error, setError] = useState("");
  const [todos, setTodos] = useState([]);
  const { getProjectsByTeamId, createNewProjectInDb } = useAuth();
  const projectNameRef = useRef();
  const textAreaRef = useRef();

  useEffect(() => {
    let timer = setTimeout(() => {
      getProjectsByTeamId(props.team.id).then((res) => {
        props.setProjects(res);
      });
    }, [1000]);

    return () => {
      clearTimeout(timer);
    };
  }, [props.modalShow]);

  // Create new project when button create is clicked
  const createNewProject = async () => {
    const projectName = projectNameRef.current.value;
    if (projectName !== "") {
      let projectObj = {
        team: props.team.id,
        name: projectName,
        completed: false,
        todos: todos,
      };
      createNewProjectInDb(projectObj);
      setTodos("");
      props.setModalShow(false);
    } else {
      setError("Failed to create project");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  // Add todo to array
  const addTodo = (e) => {
    if (e.key === "Enter" && textAreaRef.current.value !== "") {
      setTodos([...todos, e.target.value]);
      textAreaRef.current.value = "";
    }
  };

  // Remove todo from array
  const removeTodo = (todoIndex) => {
    setTodos(todos.filter((todo) => todos.indexOf(todo) !== todoIndex));
  };

  // On component load, focus
  useEffect(() => {
    textAreaRef.current && textAreaRef.current.focus();
  }, []);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="Modal"
    >
      <Form>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create New Project
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group>
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter project name.."
              ref={projectNameRef}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Todos (press "<strong>Enter</strong>" to add):
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Todo.."
              onKeyPress={addTodo}
              autoFocus
              ref={textAreaRef}
            />
          </Form.Group>
          {todos.length > 0 && (
            <>
              <hr />
              <h5>Todos: </h5>
              {todos.map((todo, idx) => (
                <div className="todo">
                  {todo}
                  <RemoveIcon
                    className="ml-5 remove-todo"
                    onClick={() => removeTodo(idx)}
                  />
                </div>
              ))}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={createNewProject}>Create</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ProjectModal;
