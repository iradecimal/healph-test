import React from "react";
import Sidebar from '../components/sidebar';
import { Container, Row, Col } from "react-bootstrap";

const Dashboard = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Row>
            TEST CONTENT
            TEST CONTENT
          </Row>
          <div>
            TEST CONTENT
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;