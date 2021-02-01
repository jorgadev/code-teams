import React from "react";
import { Container } from "react-bootstrap";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import { useAuth } from "../contexts/AuthContext";

export default function Subnavbar(props) {
  const { currentUser } = useAuth();
  const username = currentUser.email.split("@")[0];

  function handleBackClick() {
    console.log("Back clicked");
  }

  return (
    <div className="Subnavbar bg-primary py-1">
      <Container fluid className="text-white sub-message text-center">
        {props.message !== "back-icon" ? (
          props.message
        ) : (
          <div class="text-left d-flex justify-content-between">
            <ArrowBackIos onClick={handleBackClick} className="back-icon" />
            <p class="signed-in">
              Signed in as <span class="username">{username}</span>
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}
