import React from "react";
import "./landingpagecomponents.css";
import { Container, Row, Col, Button } from "react-bootstrap";

const LandingPageComponents = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "90vh" }}
    >
      <Container>
        <Row>
          <Col>
            <img
              src="HEALPH.png"
              alt="Logo"
              style={{ width: "200px", height: "auto" }}
            />
            <h1>Welcome to HEALPH Online Database</h1>
            <Button className="start" href={"/dashboard"}>
              Get Started
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPageComponents;
