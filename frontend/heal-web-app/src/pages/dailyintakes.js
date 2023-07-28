import React from "react";
import Sidebar from "../components/sidebar";
import { Container, Row, Col } from "react-bootstrap";
import DailyIntakeTable from "../components/dailyintaketable";
import SearchBar from "../components/searchbar";

const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0];

const Dailyintakes = () => {
  // Sample data
  const dataTemplate = {
    Userid: 0,
    Date: formattedDate,
    Hrsofsleep: 0,
    Glassesofwater: 0,
    Stepstaken: 0,
    Caloricintake: 0,
    Caloricdiversity: 0,
    HALE: 0,
    PHD: 0,
    Mealid: [1,2,3],
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
    <Container fluid>
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <div>
            <h2 style={{marginTop:"20px",marginBottom:"20px",color:"#9FC856",fontWeight:"600"}}>Daily Intakes</h2>
            <SearchBar/>
            <DailyIntakeTable data={data} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dailyintakes;