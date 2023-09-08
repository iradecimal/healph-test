import React from "react";
import Sidebar from "../components/sidebar";
import { Container, Row, Col } from "react-bootstrap";
import DailyIntakeTable from "../components/dailyintakes_table";
import HamburgerMenu from "../components/hamburgermenu";

const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString("en-GB");

const Dailyintakes = () => {
  // Sample data
  const dataTemplate = {
    Userid: 0,
    RecordDate: formattedDate,
    Hrsofsleep: 0,
    Glassesofwater: 0,
    Stepstaken: 0,
    Caloricintake: 0,
    Caloricdiversity: 0,
    HALE: 0,
    PHD: 0,
  };

  const data = Array.from({ length: 30 }, (_, index) => ({
    ...dataTemplate,
    Userid: index + 1,
    Hrsofsleep: Math.floor(Math.random() * 11),
    Glassesofwater: Math.floor(Math.random() * 11),
    Stepstaken: Math.floor(Math.random() * 11),
    Caloricintake: Math.floor(Math.random() * 11),
    Caloricdiversity: Math.floor(Math.random() * 11),
    HALE: Math.floor(Math.random() * 11),
    PHD: Math.floor(Math.random() * 11),
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
                Daily Intakes
              </h2>
              <DailyIntakeTable data={data} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dailyintakes;
