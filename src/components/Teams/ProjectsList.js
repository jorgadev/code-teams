import React, { useEffect, useState } from "react";
import { ListGroup, Spinner } from "react-bootstrap";
import ClearIcon from "@material-ui/icons/Clear";
import { useAuth } from "../../contexts/AuthContext";

export default function ProjectsList({ team }) {
  const [projects, setProjects] = useState([]);
  const { getProjectsByTeamId, deleteProjectFromDb } = useAuth();

  useEffect(() => {
    getProjectsByTeamId(team.id).then((res) => {
      setProjects(res);
    });
  }, []);

  const removeProjectHandler = (projectId) => {
    deleteProjectFromDb(projectId);
    const newProjects = projects.filter((project) => project.id !== projectId);
    setProjects(newProjects);
  };

  return (
    <div className="ProjectsList">
      {projects.length > 0 ? (
        <>
          {projects.map((project) => {
            return (
              <ListGroup key={project.id}>
                <ListGroup.Item>
                  {project.name}
                  <ClearIcon
                    className="remove-project"
                    onClick={() => removeProjectHandler(project.id)}
                  />
                </ListGroup.Item>
              </ListGroup>
            );
          })}
        </>
      ) : (
        <Spinner animation="border" variant="primary" className="spinner" />
      )}
    </div>
  );
}
