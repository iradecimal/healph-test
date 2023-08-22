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
  const averageSample = 7.5;
  const averageSample2 = 0;
  const averageSample3 = 1;

  //sample data since not sure what to put on the graphs yet
  const chart_sampledata = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];

  const chart_sampledata2 = [
    ["Task", "Hours per Day"],
    ["Work", 9],
    ["Eat", 3],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 8],
  ];

  const chart_sampledata3 = [
    ["Task", "Hours per Day"],
    ["Work", 10],
    ["Eat", 2],
    ["Commute", 1],
    ["Watch TV", 3],
    ["Sleep", 9],
  ];
  const bar_sampledata = [
    ["Year", "Sales", "Expenses", "Profit"],
    ["2014", 1000, 400, 200],
    ["2015", 1170, 460, 250],
    ["2016", 660, 1120, 300],
    ["2017", 1030, 540, 350],
  ];

  const bar_sampledata2 = [
    ["Year", "Sales", "Expenses", "Profit"],
    ["2014", 900, 300, 150],
    ["2015", 1100, 400, 200],
    ["2016", 700, 1000, 250],
    ["2017", 950, 500, 300],
  ];

  const bar_sampledata3 = [
    ["Year", "Sales", "Expenses", "Profit"],
    ["2014", 950, 400, 180],
    ["2015", 1050, 420, 220],
    ["2016", 800, 900, 270],
    ["2017", 1000, 600, 320],
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

  const peopleDataWeekly = [
    { Name: { first: "John", middle: "Doe", last: "Smith" }, HALE: 9 },
    { Name: { first: "Jane", middle: "E.", last: "Doe" }, HALE: 8 },
    { Name: { first: "Alice", middle: "M.", last: "Johnson" }, HALE: 7 },
    { Name: { first: "Bob", middle: "R.", last: "Williams" }, HALE: 6 },
    { Name: { first: "Emily", middle: "K.", last: "Brown" }, HALE: 5 },
    { Name: { first: "Michael", middle: "J.", last: "Miller" }, HALE: 4 },
    { Name: { first: "Olivia", middle: "A.", last: "Taylor" }, HALE: 3 },
    { Name: { first: "William", middle: "B.", last: "Davis" }, HALE: 2 },
    { Name: { first: "Sophia", middle: "C.", last: "Wilson" }, HALE: 1 },
    { Name: { first: "Daniel", middle: "S.", last: "Anderson" }, HALE: 0 },
  ];

  const peopleDataMonthly = [
    { Name: { first: "Alex", middle: "F.", last: "Johnson" }, HALE: 10 },
    { Name: { first: "Emily", middle: "G.", last: "Smith" }, HALE: 9 },
    { Name: { first: "David", middle: "H.", last: "Williams" }, HALE: 8 },
    { Name: { first: "Lily", middle: "I.", last: "Brown" }, HALE: 7 },
    { Name: { first: "Jacob", middle: "J.", last: "Doe" }, HALE: 6 },
    { Name: { first: "Ella", middle: "K.", last: "Miller" }, HALE: 5 },
    { Name: { first: "Aiden", middle: "L.", last: "Taylor" }, HALE: 4 },
    { Name: { first: "Mia", middle: "M.", last: "Davis" }, HALE: 3 },
    { Name: { first: "Noah", middle: "N.", last: "Wilson" }, HALE: 2 },
    { Name: { first: "Olivia", middle: "O.", last: "Anderson" }, HALE: 1 },
  ];

  const [overviewInterval, setOverviewInterval] = useState("daily");
  const [leaderboardInterval, setLeaderboardInterval] = useState("daily");
  const intervalOptions = ["daily", "weekly", "monthly"];
  // const [averageHALE, setAverageHALE] = useState(averageSample);
  // const [averagePHD, setAveragePHD] = useState(averageSample);
  // const [averageSteps, setAverageSteps] = useState(averageSample);
  // const [averageHrsofSleep, setHrsofSleep] = useState(averageSample);
  // const [averageWaterIntake, setAverageWaterIntake] = useState(averageSample);
  // const [averageFoodWaste, setFoodWaste] = useState(averageSample);
  // const [averageDiversity, setAverageDiversity] = useState(averageSample);
  const [averageValue, setAverageValue] = useState(averageSample);
  const [chartData, setChartData] = useState(chart_sampledata);
  const [barChartData, setBarChartData] = useState(bar_sampledata);
  const [leaderboardData, setLeaderboardData] = useState(peopleData);

  const handleOverviewIntervalChange = (interval) => {
    setOverviewInterval(interval);

    let newAverageValue = averageSample;
    let newChartData = chart_sampledata;
    let newBarChartData = bar_sampledata;

    if (interval === "weekly") {
      newAverageValue = averageSample2;
      newChartData = chart_sampledata2;
      newBarChartData = bar_sampledata2;
    } else if (interval === "monthly") {
      newAverageValue = averageSample3;
      newChartData = chart_sampledata3;
      newBarChartData = bar_sampledata3;
    }
    setAverageValue(newAverageValue);
    setChartData(newChartData);
    setBarChartData(newBarChartData);
  };

  const handleLeaderboardIntervalChange = (interval) => {
    setLeaderboardInterval(interval);

    let newLeaderboard = peopleData;

    if (interval === "weekly") {
      newLeaderboard = peopleDataWeekly;
    } else if (interval === "monthly") {
      newLeaderboard = peopleDataMonthly;
    }
    setLeaderboardData(newLeaderboard);
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
                  value={averageValue}
                />
              </Col>
              <Col md={3} sm={6} style={{ marginBottom: "20px" }}>
                <AvgCard
                  icon={<FaPlateWheat />}
                  label="Avg. PHD"
                  value={averageValue}
                />
              </Col>
              <Col md={3} sm={6} style={{ marginBottom: "20px" }}>
                <AvgCard
                  icon={<FaWalking />}
                  label="Avg. Steps"
                  value={averageValue}
                />
              </Col>
              <Col md={3} sm={6} style={{ marginBottom: "20px" }}>
                <AvgCard
                  icon={<FaBed />}
                  label="Avg. Hours of Sleep"
                  value={averageValue}
                />
              </Col>
            </Row>

            <Row>
              <Col md={3} sm={6} style={{ marginBottom: "20px" }}>
                <AvgCard
                  icon={<FaGlassWater />}
                  label="Avg. Water Intake"
                  value={averageValue}
                />
              </Col>
              <Col md={3} sm={6} style={{ marginBottom: "20px" }}>
                <AvgCard
                  icon={<FaTrashCan />}
                  label="Avg. Food Waste"
                  value={averageValue}
                />
              </Col>
              <Col md={3} sm={6} style={{ marginBottom: "20px" }}>
                <AvgCard
                  icon={<FaNutritionix />}
                  label="Avg. Diversity"
                  value={averageValue}
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
                      data={chartData}
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
                      data={barChartData}
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

            <LeaderboardsTable data={leaderboardData} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
