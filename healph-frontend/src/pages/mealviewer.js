import React from "react";
import Sidebar from "../components/sidebar";
import { Container, Row, Col } from "react-bootstrap";
import MealViewerTable from "../components/mealviewer_table";
import HamburgerMenu from "../components/hamburgermenu";

const MealViewer = () => {
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
                Meal Viewer
              </h2>
              <MealViewerTable />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MealViewer;
