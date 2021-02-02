import React from "react";
import { Container } from "react-bootstrap";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function Subnavbar(props) {
  const { currentUser } = useAuth();
  let history = useHistory();
  let username;

  if (currentUser) {
    username = currentUser.email.split("@")[0];
  }

  async function backClickHandler() {
    history.goBack();
  }

  return (
    <div className="Subnavbar bg-primary py-1 d-flex justify-content-center align-items-center">
      <Container
        fluid
        className="Subnavbar text-white sub-message text-center  bg-primary py-1"
      >
        {props.message !== "back-icon" ? (
          props.message
        ) : (
          <div className="text-left d-flex justify-content-between">
            <ArrowBackIos onClick={backClickHandler} className="back-icon" />
            <p className="signed-in">
              Signed in as <span className="username">{username}</span>
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}
