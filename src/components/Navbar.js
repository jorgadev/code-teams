import React from "react";
import { Container, Button } from "react-bootstrap";
import logo from "../assets/images/logo.png";

export default function Navbar() {
  return (
    <Container className="Navbar d-flex justify-content-between align-items-center py-3">
      <a href="/" className="text-center text-md-left">
        <img className="w-50" src={logo} alt="Logo" />
      </a>
      <div className="menu d-none d-md-flex">
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
  );
}
