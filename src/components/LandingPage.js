import React from "react";
import Subnavbar from "./Subnavbar";
import { Jumbotron, Container, Row, Col, Button } from "react-bootstrap";
import monitor from "../assets/images/monitor.png";
import "../index.scss";
import CodeIcon from "@material-ui/icons/Code";
import GroupIcon from "@material-ui/icons/Group";
import TocIcon from "@material-ui/icons/Toc";

export default function LandingPage() {
  return (
    <>
      <div className="LandingPage">
        <Subnavbar message="Improve your team experience  with new features." />
        <Jumbotron className="px-0 py-5">
          <Row className="m-0">
            <Col className="left-column d-flex flex-column justify-content-center p-0">
              <h1 className="text-primary">Be a Leader!</h1>
              <h3 className="font-weight-light">More ways to lead a team.</h3>
              <div className="mt-5">
                <Button variant="primary" className="px-5">
                  Sign Up
                </Button>
                <Button variant="outline-primary" className="px-5 ml-3">
                  Log In
                </Button>
              </div>
            </Col>
            <Col className="d-flex justify-content-end p-0">
              <img src={monitor} />
            </Col>
          </Row>
        </Jumbotron>
        <section>
          <Container className="text-center py-5">
            <h1>Come together</h1>
            <p className="pb-5">
              Stay connected and organized. Accomplish more together across
              work, programming and coding life.
            </p>
            <Row className="mt-5">
              <Col className="mx-3">
                <CodeIcon className="landing-icon"></CodeIcon>
                <h3 className="mt-3 font-weight-bold">All your data</h3>
                <p className="mt-2 font-weight-light">
                  Only with your data securely stored in one place, can you
                  offera na intelligent, unified, omni-channel experience. Only
                  with your data securely stored in one place, can you offera na
                  intelligent, unified, omni-channel experience.
                </p>
              </Col>
              <Col className="mx-3">
                <GroupIcon className="landing-icon"></GroupIcon>
                <h3 className="mt-3 font-weight-bold">All your data</h3>
                <p className="mt-2 font-weight-light">
                  Only with your data securely stored in one place, can you
                  offera na intelligent, unified, omni-channel experience. Only
                  with your data securely stored in one place, can you offera na
                  intelligent, unified, omni-channel experience.
                </p>
              </Col>
              <Col className="mx-3">
                <TocIcon className="landing-icon"></TocIcon>
                <h3 className="mt-3 font-weight-bold">All your data</h3>
                <p className="mt-2 font-weight-light">
                  Only with your data securely stored in one place, can you
                  offera na intelligent, unified, omni-channel experience. Only
                  with your data securely stored in one place, can you offera na
                  intelligent, unified, omni-channel experience.
                </p>
              </Col>
            </Row>
          </Container>
        </section>
        <footer className="footer text-white text-center py-3 mt-5">
          Copyright &copy; 2021 Code Teams | Powered by{" "}
          <a href="https://www.linkedin.com/in/jorgadev/">jorgadev</a>.
        </footer>
      </div>
    </>
  );
}
