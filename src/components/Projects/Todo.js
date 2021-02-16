import React from "react";
import { ListGroup } from "react-bootstrap";
import DeleteIcon from "@material-ui/icons/Delete";
import { useAuth } from "../../contexts/AuthContext";

export default function Todo({ view, todo, projectsDOM, setProjectsDOM }) {
  const { deleteTodoFromDb } = useAuth();

  const deleteTodoHandler = (todoId) => {
    deleteTodoFromDb(todoId);
    const newProjects = projectsDOM.map((project) => {
      return {
        ...project,
        todos: project.todos.filter((todo) => todo.id !== todoId),
      };
    });
    setProjectsDOM(newProjects);
  };

  const editTodo = (e, todoId) => {
    if (!e.target.classList.contains("admin-todo")) {
      return null;
    } else {
      console.log("open modal");
    }
  };

  return (
    <>
      {view === "user" ? (
        todo.status === "open" ? (
          <ListGroup.Item className="user-todo" onClick={editTodo}>
            <p>{todo.name}</p>
          </ListGroup.Item>
        ) : null
      ) : (
        <ListGroup.Item
          className="admin-todo"
          onClick={(e) => editTodo(e, todo.id)}
        >
          {todo.status === "open" ? (
            <p>{todo.name}</p>
          ) : todo.status === "pending" ? (
            <p>
              <b>{todo.name}</b>
            </p>
          ) : (
            <p>
              <s>{todo.name}</s>
            </p>
          )}
          <DeleteIcon
            className="delete-icon"
            onClick={(e) => deleteTodoHandler(todo.id)}
          />
        </ListGroup.Item>
      )}
    </>
  );
}
