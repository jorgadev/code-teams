import React, { useState, useEffect } from "react";
import CreateIcon from "@material-ui/icons/Create";
import ProgressBar from "./ProgressBar";
import { useAuth } from "../contexts/AuthContext";

export default function Avatar() {
  const [overlay, setOverlay] = useState("d-none");
  const [file, setFile] = useState(null);
  const types = ["image/png", "image/jpeg"];
  const [activeUser, setActiveUser] = useState();
  const { currentUser, getActiveUser } = useAuth();

  useEffect(() => {
    getActiveUser(currentUser.uid).then((res) => setActiveUser(res[0]));
  }, [file, currentUser.uid, getActiveUser]);

  const changeAvatarHandler = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      //setError("");
    } else {
      setFile(null);
      //setError("Please select an image file (png or jpeg).");
    }
  };

  return (
    <>
      {activeUser && (
        <div className="Avatar d-flex justify-content-center align-items-center flex-column">
          <form>
            <label
              className="avatar-wrapper"
              onMouseEnter={() => setOverlay("d-flex")}
              onMouseLeave={() => setOverlay("d-none")}
            >
              <div className={`avatar-overlay ${overlay}`}>
                <input type="file" onChange={changeAvatarHandler} />
                <CreateIcon />
              </div>
              <img className="avatar-pic" src={activeUser.avatar} />
            </label>
          </form>
          <p className="lead">{activeUser.username}</p>
          {file && (
            <ProgressBar
              file={file}
              setFile={setFile}
              activeUser={activeUser}
            />
          )}
        </div>
      )}
    </>
  );
}
