import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import HamburgerMenu from "../components/hamburgermenu";
import LeaderboardsTable from "../components/leaderboardsTable";
import IntervalDropdown from "../components/intervalDropdown";
import { Container, Row, Col } from "react-bootstrap";
import AvgCard from "../components/avgCard";
import { FaWalking, FaBed, FaNutritionix } from "react-icons/fa";
import {
  FaPlateWheat,
  FaGlassWater,
  FaTrashCan,
  FaChartBar,
} from "react-icons/fa6";
import { GiHealthIncrease, GiPieChart } from "react-icons/gi";
import { Chart } from "react-google-charts";

const Dashboard = () => {
  // Dummy data
  const averageSteps = 7500;
  const averageSleep = 7.5;

  //sample data since not sure what to put on the graphs yet
  const chart_sampledata = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];

  const bar_sampledata = [
    ["Year", "Sales", "Expenses", "Profit"],
    ["2014", 1000, 400, 200],
    ["2015", 1170, 460, 250],
    ["2016", 660, 1120, 300],
    ["2017", 1030, 540, 350],
  ];

  //leaderboards dummy data
  const peopleData = [
    { Name: { first: "John", middle: "Doe", last: "Smith" }, HALE: 10 },
    { Name: { first: "Jane", middle: "E.", last: "Doe" }, HALE: 9 },
    { Name: { first: "Alice", middle: "M.", last: "Johnson" }, HALE: 8 },
    { Name: { first: "Bob", middle: "R.", last: "Williams" }, HALE: 7 },
    { Name: { first: "Emily", middle: "K.", last: "Brown" }, HALE: 6 },
    { Name: { first: "Michael", middle: "J.", last: "Miller" }, HALE: 5 },
    { Name: { first: "Olivia", middle: "A.", last: "Taylor" }, HALE: 4 },
    { Name: { first: "William", middle: "B.", last: "Davis" }, HALE: 3 },
    { Name: { first: "Sophia", middle: "C.", last: "Wilson" }, HALE: 2 },
    { Name: { first: "Daniel", middle: "S.", last: "Anderson" }, HALE: 1 },
  ];

  const [overviewInterval, setOverviewInterval] = useState("daily");
  const [leaderboardInterval, setLeaderboardInterval] = useState("daily");
  const intervalOptions = ["daily", "weekly", "monthly"];

  const handleOverviewIntervalChange = (interval) => {
    setOverviewInterval(interval);
  };

  const handleLeaderboardIntervalChange = (interval) => {
    setLeaderboardInterval(interval);
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
                Dashboard
              </h2>
            </div>

            <div>
              <h4
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  color: "#9FC856",
                  fontWeight: "600",
                }}
              >
                Overview
              </h4>
              <IntervalDropdown
                intervalOptions={intervalOptions}
                selectedInterval={overviewInterval}
                onIntervalChange={handleOverviewIntervalChange}
              />
            </div>

            <Row>
              <Col md={3} sm={6} style={{ marginBottom: "20px" }}>
                <AvgCard
                  icon={<GiHealthIncrease />}
                  label="Avg. HALE"
                  value={averageSteps}
                />
              </Col>
              <Col md={3} sm={6} style={{ marginBottom: "20px" }}>
                <AvgCard
                  icon={<FaPlateWheat />}
                  label="Avg. PHD"
                  value={averageSleep}
                />
              </Col>
              <Col md={3} sm={6} style={{ marginBottom: "20px" }}>
                <AvgCard
                  icon={<FaWalking />}
                  label="Avg. Steps"
                  value={averageSleep}
                />
              </Col>
              <Col md={3} sm={6} style={{ marginBottom: "20px" }}>
                <AvgCard
                  icon={<FaBed />}
                  label="Avg. Hours of Sleep"
                  value={averageSleep}
                />
              </Col>
            </Row>

            <Row>
              <Col md={3} sm={6} style={{ marginBottom: "20px" }}>
                <AvgCard
                  icon={<FaGlassWater />}
                  label="Avg. Water Intake"
                  value={averageSleep}
                />
              </Col>
              <Col md={3} sm={6} style={{ marginBottom: "20px" }}>
                <AvgCard
                  icon={<FaTrashCan />}
                  label="Avg. Food Waste"
                  value={averageSleep}
                />
              </Col>
              <Col md={3} sm={6} style={{ marginBottom: "20px" }}>
                <AvgCard
                  icon={<FaNutritionix />}
                  label="Avg. Diversity"
                  value={averageSleep}
                />
              </Col>
            </Row>

            <Row>
              <Col md={6} sm={6} style={{ marginBottom: "20px" }}>
                <AvgCard
                  icon={<GiPieChart />}
                  label="Sample pie chart"
                  value={
                    <Chart
                      chartType="PieChart"
                      data={chart_sampledata}
                      width={"100%"}
                      height={"400px"}
                    />
                  }
                />
              </Col>
              <Col md={6} sm={6} style={{ marginBottom: "20px" }}>
                <AvgCard
                  icon={<FaChartBar />}
                  label="Sample bar"
                  value={
                    <Chart
                      chartType="Bar"
                      width="100%"
                      height="400px"
                      data={bar_sampledata}
                    />
                  }
                />
              </Col>
            </Row>
            <div>
              <h4
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  color: "#9FC856",
                  fontWeight: "600",
                }}
              >
                Leaderboards
              </h4>

              <IntervalDropdown
                intervalOptions={intervalOptions}
                selectedInterval={leaderboardInterval}
                onIntervalChange={handleLeaderboardIntervalChange}
              />
            </div>

            <LeaderboardsTable data={peopleData} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
