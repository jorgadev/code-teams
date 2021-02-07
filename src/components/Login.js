import React, { useRef, useState } from "react";
import Subnavbar from "./Subnavbar";
import Navbar from "./Navbar";

import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  // Create refs for email and password and implement currentUser and login from context
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  // If current user is recognized, automatically redirec to dashboard (skip login/signup)
  if (currentUser) {
    return <Redirect to={"/dashboard"} />;
  }

  // Log user in and redirect to "/index"
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      // Wait for user to be logged in an redirect him to dashboard
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/dashboard");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  return (
    <>
      <Navbar />
      <Subnavbar message={"Feel free to join us!"} />
      <div className="Login d-flex justify-content-center align-items-center">
        <div className="w-100 card-container">
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Log In</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  Log In
                </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </>
  );
}
