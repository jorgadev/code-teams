import React, { useState, useEffect, useRef } from "react";
import ProjectModal from "./ProjectModal";

export default function TeamProjects({ team, activeUser }) {
  const [projects, setProjects] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="TeamProjects">
      {projects ? (
        "return .map() trorugh projects"
      ) : (
        <div className="add-projects-wrapper">
          {activeUser.id === team.creator && (
            <>
              <button variant="primary" onClick={() => setModalShow(true)}>
                Launch vertically centered modal
              </button>
              <ProjectModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                setModalShow={setModalShow}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
