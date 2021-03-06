import React from "react";
import { Container, Button } from "react-bootstrap";
import logo from "../assets/images/logo.png";

import { useAuth } from "../contexts/AuthContext";

// Recieve showLogout prop from Index which determine what will be show in navbar menu
export default function Navbar({ showLogout }) {
  const { logout } = useAuth();

  return (
    <Container className="Navbar d-flex justify-content-between align-items-center py-3">
      <a href="/" className="text-center text-md-left">
        <img className="w-50" src={logo} alt="Logo" />
      </a>
      <div className="menu d-none d-md-flex">
        {showLogout ? (
          <Button onClick={logout} variant="outline-primary" className="mr-3 ">
            Log Out
          </Button>
        ) : (
          <>
            <a href="/signup">
              <Button variant="primary" className="mr-3 ">
                Sign Up
              </Button>
            </a>
            <a href="login">
              <Button variant="outline-primary">Log In</Button>
            </a>
          </>
        )}
      </div>
    </Container>
  );
}
