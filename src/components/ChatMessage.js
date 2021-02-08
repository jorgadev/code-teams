import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function ChatMessage(props) {
  const { currentUser, getActiveUser } = useAuth();
  const { body, uid, createdAt } = props.message;
  const [username, setUsername] = useState();

  useEffect(() => {
    getActiveUser(uid).then((res) => setUsername(res[0].username));
  }, [getActiveUser]);

  return (
    <>
      {currentUser && username && (
        <div
          className={
            uid == currentUser.uid
              ? "Me text-right ml-auto text-white p-3 my-1"
              : "Other text-left mr-auto p-3 my-1"
          }
        >
          <p>
            <strong>{username}</strong> says:
          </p>
          <p>{body}</p>
        </div>
      )}
    </>
  );
}
