import React from "react";
import { Container } from "react-bootstrap";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import { useAuth } from "../contexts/AuthContext";

export default function Subnavbar(props) {
  const { currentUser } = useAuth();
  let username;
  if (currentUser) {
    username = currentUser.email.split("@")[0];
  }

  function handleBackClick() {
    console.log("Back clicked");
  }

  return (
    <div className="Subnavbar bg-primary py-1">
      <Container fluid className="text-white sub-message text-center">
        {props.message !== "back-icon" ? (
          props.message
        ) : (
          <div className="text-left d-flex justify-content-between">
            <ArrowBackIos onClick={handleBackClick} className="back-icon" />
            <p className="signed-in">
              Signed in as <span className="username">{username}</span>
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}
