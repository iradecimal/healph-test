import React from "react";
import Sidebar from "../components/sidebar";
import { Container, Row, Col } from "react-bootstrap";
import ReportsTable from "../components/reports_table";
import HamburgerMenu from "../components/hamburgermenu";

const ReportsPage = () => {
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
                Reports
              </h2>
              <ReportsTable />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ReportsPage;
