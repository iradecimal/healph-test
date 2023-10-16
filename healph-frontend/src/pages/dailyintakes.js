import React from "react";
import Sidebar from "../components/sidebar";
import { Container, Row, Col } from "react-bootstrap";
import DailyIntakeTable from "../components/dailyintakes_table";
import HamburgerMenu from "../components/hamburgermenu";

const Dailyintakes = () => {
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
              <h2
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  color: "#9FC856",
                  fontWeight: "600",
                }}
              >
                Daily Intakes
              </h2>
              <DailyIntakeTable />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dailyintakes;
