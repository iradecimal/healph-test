import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { Container, Row, Col } from "react-bootstrap";
import ReportsTable from "../components/reports_table";
import HamburgerMenu from "../components/hamburgermenu";
import axios from "axios";

const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString("en-GB");

const ReportsPage = () => {

  const [reports, setReports] = useState([]);
  console.log(reports)
  /*
  useEffect(()=> {
    axios.get('http://localhost:3000/reports/getall')
    .then(reports => {
      setReports(reports.data)
    })
    .catch(err => {
      console.log(err)
    })
  })
*/
  const handleStatusChange = (itemIndex) => {
    const updatedData = [...reports];
    updatedData[itemIndex].Status = updatedData[itemIndex].Status === 0 ? 1 : 0;
    setReports(updatedData);
  };

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
              <ReportsTable
                data={reports}
                onStatusChange={handleStatusChange}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ReportsPage;
