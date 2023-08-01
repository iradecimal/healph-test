import React from "react";
import Sidebar from '../components/sidebar';
import HamburgerMenu from "../components/hamburgermenu";
import { Container, Row, Col } from "react-bootstrap";

const Dashboard = () => {
  return (
    <div>
      <HamburgerMenu />
      <Container fluid>
        <Row>
          <Col md={2}>
            <Sidebar />
          </Col>
          <Col md={10}>
            <div>
              <h2 style={{marginTop:"20px",marginBottom:"20px",color:"#9FC856",fontWeight:"600"}}>Dashboard</h2>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;