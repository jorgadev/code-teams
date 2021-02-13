import React, { useState, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import TeamsModal from "./TeamsModal";
import { useAuth } from "../../contexts/AuthContext";

export default function CreateTeam({ activeUser, setUserTeams }) {
  // By default don't show modal
  const [modalShow, setModalShow] = useState(false);
  // Create an blank array where all users will be added after fetch
  const [allUsers, setAllUsers] = useState([]);
  // Function from context that returns all users from database
  const { getAllUsers } = useAuth();

  // On component first time render get all users and save them in array "allUsers"
  useEffect(() => {
    getAllUsers().then((res) => setAllUsers(res));
    return () => {
      setAllUsers(null);
    };
  }, []);

  return (
    <div className="mr-3 mt-3">
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
          setModalShow={setModalShow}
          setUserTeams={setUserTeams}
        />
      )}
    </div>
  );
}
