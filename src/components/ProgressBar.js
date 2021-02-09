import React, { useEffect } from "react";
import useStorage from "../hooks/useStorage";
import { useAuth } from "../contexts/AuthContext";

const ProgressBar = ({ file, setFile, activeUser }) => {
  const { url, progress } = useStorage(file);
  const { insertNewAvatar } = useAuth();

  useEffect(() => {
    if (url) {
      setFile(null);
      insertNewAvatar(activeUser.id, url);
    }
  }, [url, setFile]);

  return <div className="progress-bar" style={{ width: progress + "%" }}></div>;
};

export default ProgressBar;
