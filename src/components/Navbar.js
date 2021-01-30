import React from "react";
import { Container, Button } from "react-bootstrap";

import logo from "../assets/images/logo.png";

export default function Navbar() {
  return (
    <nav>
      <Container className="d-flex justify-content-between align-items-center py-3">
        <a href="/">
          <img className="w-50" src={logo} />
        </a>
        <div className="menu">
          <a href="/signup">
            <Button variant="primary" className="mr-3">
              Sign Up
            </Button>
          </a>
          <a href="login">
            <Button variant="outline-primary">Log In</Button>
          </a>
        </div>
      </Container>
    </nav>
  );
}
