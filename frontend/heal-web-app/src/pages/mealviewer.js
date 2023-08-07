import React from "react";
import Sidebar from "../components/sidebar";
import { Container, Row, Col } from "react-bootstrap";
import MealViewerTable from "../components/mealviewer_table";
import HamburgerMenu from "../components/hamburgermenu";

const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString("en-GB");

const MealViewer = () => {
  // Sample data
  const dataTemplate = {
    Mealid: 0,
    RecordDate: formattedDate,
    Fats: 0,
    Carbohydrates: 0,
    Protein: 0,
    Foodwaste: 0,
    Foodcombination: ["a", "b", "c"],
    Description: "Lorem ipsum",
  };

  const data = Array.from({ length: 30 }, (_, index) => ({
    ...dataTemplate,
    Mealid: index + 1,
    RecordDate: formattedDate,
    Fats: Math.floor(Math.random() * 11),
    Carbohydrates: Math.floor(Math.random() * 11),
    Protein: Math.floor(Math.random() * 11),
    Foodwaste: Math.floor(Math.random() * 11),
  }));

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
              <MealViewerTable data={data} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MealViewer;
