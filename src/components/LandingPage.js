import React from "react";
import Subnavbar from "./Subnavbar";
import { Jumbotron, Container, Row, Col } from "react-bootstrap";
import mockup from "../assets/images/mockup.png";
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
          <Row className="container mx-auto">
            <Col
              xs={12}
              lg={8}
              className="left-column d-flex flex-column justify-content-center text-center text-lg-left"
            >
              <h1 className="text-primary">Be a Leader!</h1>
              <h3 className="font-weight-light">More ways to lead a team.</h3>
              <div className="mt-3 mt-lg-5">
                <a href="/signup" className="px-5 btn btn-primary">
                  Sign Up
                </a>
                <a href="/login" className="px-5 ml-3 btn btn-outline-primary">
                  Log In
                </a>
              </div>
            </Col>
            <Col
              xs={12}
              lg={4}
              className="d-flex justify-content-center mt-xs-5 mt-md-0"
            >
              <img
                className="mt-5 w-100 monitor-picture"
                src={mockup}
                alt="Monitor"
              />
            </Col>
          </Row>
        </Jumbotron>
        <section className="section py-5">
          <Container className="text-center py-5">
            <h1>Come together</h1>
            <p className="pb-5">
              Stay connected and organized. Accomplish more together across
              work, programming and coding life.
            </p>
            <Row className="mt-md-5">
              <Col xs={12} md={4} className="mt-3 mt-md-0">
                <CodeIcon className="landing-icon"></CodeIcon>
                <h3 className="mt-3 font-weight-bold">All your data</h3>
                <p className="mt-2 font-weight-light">
                  Only with your data securely stored in one place, can you
                  offera na intelligent, unified, omni-channel experience. Only
                  with your data securely stored in one place, can you offera na
                  intelligent, unified, omni-channel experience.
                </p>
              </Col>
              <Col xs={12} md={4} className="mt-3 mt-md-0">
                <GroupIcon className="landing-icon"></GroupIcon>
                <h3 className="mt-3 font-weight-bold">Teamwork</h3>
                <p className="mt-2 font-weight-light">
                  Teamwork is the ability to work together toward a common
                  vision. The ability to direct individual accomplishments
                  toward organizational objectives. It is the fuel that allows
                  common people to attain uncommon results.
                </p>
              </Col>
              <Col xs={12} md={4} className="mt-3 mt-md-0">
                <TocIcon className="landing-icon"></TocIcon>
                <h3 className="mt-3 font-weight-bold">Improvement</h3>
                <p className="mt-2 font-weight-light">
                  While others allow failure to define them, others allow lack
                  or abundance to define them. You cannot define yourself that
                  way! You may have failed in the past but that is not the end
                  of the world.
                </p>
              </Col>
            </Row>
          </Container>
        </section>
        <footer className="footer text-white text-center py-3 mt-5">
          Copyright &copy; 2021 Code Teams | Powered by{" "}
          <a href="https://www.linkedin.com/in/jorgadev/">jorgadev</a>
        </footer>
      </div>
    </>
  );
}
