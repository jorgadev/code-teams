import React, { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import * as firebase from "firebase/app";
import { firestore, auth } from "../firebase";
import { Form, Button } from "react-bootstrap";

import { useCollectionData } from "react-firebase-hooks/firestore";

export default function Chat({ team, activeUser }) {
  // we will use this to scroll to bottom of chat on page-reload and after sending a message
  const dummy = useRef();
  const scrollToBottom = () => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  // getting the message and sorting them by time of creation
  const messagesRef = firestore.collection("messages");
  const query = messagesRef
    .where("team", ">=", team.id)
    .orderBy("team", "asc")
    .orderBy("createdAt", "desc")
    .limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState();

  const sendMessage = async (e) => {
    e.preventDefault();
    // gets name, userID and pfp of logged in user
    const { uid } = auth.currentUser;

    console.log(auth.currentUser);

    await messagesRef.add({
      body: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      team: team.id,
      uid: uid,
    });

    // resetting form value and scrolling to bottom
    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="Chat">
      <div>
        {/* we will loop over the message and return a
        ChatMessage component for each message */}
        {messages &&
          messages
            .reverse()
            .map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <span ref={dummy}></span>
      </div>

      {/* Form to type and submit messages */}
      <Form onSubmit={sendMessage} className="mt-5">
        <Form.Group className="d-flex">
          <Form.Control
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="Say something"
          />
          <Button type="submit" disabled={!formValue} className="px-3">
            Send
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

// messages: [
//   {user: "id1", content: "first message", date: new Date()},
//   {user: "id2", content: "second message", date: new Date()}
// ]
