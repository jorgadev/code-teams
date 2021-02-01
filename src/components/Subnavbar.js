import React from "react";
import { Container } from "react-bootstrap";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";

export default function Subnavbar(props) {
  function handleBackClick() {
    console.log("hahah");
  }

  return (
    <div className="Subnavbar bg-primary py-1">
      <Container
        fluid
        className={`text-white ${
          props.message !== "back-icon" ? "text-center" : "text-left"
        } sub-message`}
      >
        {props.message !== "back-icon" ? (
          props.message
        ) : (
          <ArrowBackIos onClick={handleBackClick} className="back-icon" />
        )}
      </Container>
    </div>
  );
}
