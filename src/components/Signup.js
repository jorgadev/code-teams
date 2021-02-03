import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, Redirect } from "react-router-dom";
import Subnavbar from "./Subnavbar";
import { dbInsert } from "../database";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If there is user logged, automatically redirect to /dashboard
  if (currentUser) {
    return <Redirect to={"/dashboard"} />;
  }

  // Register user and redirect to "/index"
  async function handleSubmit(e) {
    e.preventDefault();

    // Password validation
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value).then(
        (res) => {
          if (res.user) {
            const username = res.user.email.split("@")[0];
            const userObj = {
              type: "blankUser",
              data: {
                id: res.user.uid,
                avatar: "default-avatar-url",
                memberof: "[]",
                projects: "[]",
                username: username,
              },
            };
            dbInsert(userObj);
          } else {
            setError("Failed to create user");
          }
        }
      );
      //history.push("/dashboard");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <>
      <Subnavbar message={"Feel free to join us!"} />
      <div className="Signup d-flex justify-content-center align-items-center">
        <div className="w-100 card-container">
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Sign Up</h2>
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
                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    required
                  />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </div>
      </div>
    </>
  );
}
