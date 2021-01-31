import React from "react";
import { Container } from "react-bootstrap";

export default function Subnavbar(props) {
  return (
    <div className="bg-primary py-1">
      <Container className="text-white text-center sub-message">
        {props.message}
      </Container>
    </div>
  );
}
