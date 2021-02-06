import React, { useState, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import TeamsModal from "./TeamsModal";
import { useAuth } from "../contexts/AuthContext";

export default function CreateTeam({ activeUser }) {
  const [modalShow, setModalShow] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const { getAllUsers } = useAuth();

  useEffect(() => {
    const unsubscribe = getAllUsers().then((res) => setAllUsers(res));
  }, []);

  return (
    <>
      <div
        className="CreateTeam d-flex justify-content-center align-items-center"
        onClick={() => setModalShow(true)}
      >
        <AddIcon className="add-icon" />
      </div>
      {activeUser && (
        <TeamsModal
          activeUser={activeUser}
          users={allUsers}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      )}
    </>
  );
}
