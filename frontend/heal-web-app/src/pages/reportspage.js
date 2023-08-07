import React from "react";
import Sidebar from "../components/sidebar";
import { Container, Row, Col } from "react-bootstrap";
import ReportsTable from "../components/reports_table";
import HamburgerMenu from "../components/hamburgermenu";

const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString("en-GB");

const ReportsPage = () => {
  // Sample data
  const dataTemplate = {
    ReportId: 0,
    RecordDate: formattedDate,
    Type: 0,
    Details: "Lorem Ipsum",
    Status: 0,
  };

  const data = Array.from({ length: 30 }, (_, index) => ({
    ...dataTemplate,
    ReportId: index + 1,
    RecordDate: formattedDate,
    Type: Math.floor(Math.random() * 3),
    Status: Math.floor(Math.random() * 2),
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
                Reports
              </h2>
              <ReportsTable data={data} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ReportsPage;
