import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import HamburgerMenu from "../components/hamburgermenu";
import LeaderboardsTable from "../components/leaderboardsTable";
import IntervalDropdown from "../components/intervalDropdown";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import AvgCard from "../components/avgCard";
import { FaWalking, FaBed, FaHamburger } from "react-icons/fa";
import {
  FaPlateWheat,
  FaGlassWater,
  FaTrashCan,
  FaPeopleGroup,
  FaBreadSlice,
  FaWeightScale,
} from "react-icons/fa6";
import {
  GiHealthIncrease,
  GiChickenLeg,
  GiMeat,
  GiAges,
  GiWeightScale,
  GiHealthCapsule,
  GiMeal,
  GiBodyHeight,
} from "react-icons/gi";
import { PiGenderIntersexBold } from "react-icons/pi";

import { Chart } from "react-google-charts";
import axios from "axios";

const Dashboard = () => {
  const [overviewInterval, setOverviewInterval] = useState("daily");
  const [leaderboardInterval, setLeaderboardInterval] = useState("daily");
  const intervalOptions = ["daily", "weekly", "monthly"];
  const [intakeStats, setIntakeStats] = useState([]);
  const [mealStats, setMealStats] = useState([]);
  const [leaderboards, setLeaderboards] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [loadingMealStats, setLoadingMealStats] = useState(true);
  const [loadingIntakeStats, setLoadingIntakeStats] = useState(true);
  const [loadingLeaderboards, setLoadingLeaderboards] = useState(true);
  const [loadingUserCount, setLoadingUserCount] = useState(true);

  //DUMMY DATA
  const SexData = [
    ["Sex", "Count"],
    ["Male", 40],
    ["Female", 60],
  ];

  const ageData = [
    ["Age Group", "Percentage"],
    ["17-18", 30],
    ["19-20", 25],
    ["21-22", 20],
    ["23-24", 15],
    ["25", 10],
  ];

  const healthConditionData = [
    ["Health Condition", "Percentage"],
    ["Diabetes", 40],
    ["Cardiovascular Diseases", 15],
    ["Hypertension", 25],
    ["Cancer", 0],
    ["Stroke", 0],
    ["Kidney Disorders", 20],
  ];

  const dailyPhdData = [
    ["Day of the Week", "PhD Value"],
    ["Sunday", 2.3],
    ["Monday", 2.1],
    ["Tuesday", 1.5],
    ["Wednesday", 1.8],
    ["Thursday", 1.6],
  ];

  const weeklyPhdData = [
    ["Week Start Date", "Average PhD Value"],
    ["2023-10-01", 1.5],
    ["2023-10-08", 2.5],
    ["2023-10-15", 2.1],
    ["2023-10-22", 1.6],
  ];

  const monthlyPhdData = [
    ["Month", "Average PhD Value"],
    ["August", 2.4],
    ["September", 1.3],
    ["October", 1.75],
  ];

  const dailyMealData = [
    ["Food Type", "Percentage"],
    ["Water", 10],
    ["Combo Main", 20],
    ["Combo Dessert", 5],
    ["Combo Appetizer", 5],
    ["Combo Soup", 5],
    ["Fruit & Vegetables", 15],
    ["Carbohydrates", 15],
    ["Dairy", 5],
    ["Animal-Sourced Protein", 10],
    ["Plant-Sourced Protein", 10],
    ["Sugar", 5],
    ["Fat", 5],
  ];

  const dailyHaleData = [
    ["Day of the Week", "HALE Value"],
    ["Sunday", 1.6],
    ["Monday", 1.5],
    ["Tuesday", 1.8],
    ["Wednesday", 1.7],
    ["Thursday", 1.6],
  ];

  const weeklyHaleData = [
    ["Week Start Date", "Average HALE Value"],
    ["2023-10-01", 1.65],
    ["2023-10-08", 1.7],
    ["2023-10-15", 1.68],
    ["2023-10-22", 1.67],
  ];

  const monthlyHaleData = [
    ["Month", "Average HALE Value"],
    ["August", 1.7],
    ["September", 1.68],
    ["October", 1.69],
  ];

  const [PhdData, setPhdData] = useState(dailyPhdData);
  const [hAxisTitle, setHAxisTitle] = useState("Day");
  const [HaleData, setHaleData] = useState(dailyHaleData);

  useEffect(() => {
    // Fetch data for mealStats
    axios
      .get(`${process.env.REACT_APP_BACKEND}/dashboard/dailystats/meal`)
      .then((response) => {
        setMealStats(response.data);
        setLoadingMealStats(false);
      })
      .catch((error) => {
        console.error("Error fetching mealStats data:", error);
        setLoadingMealStats(false);
      });

    // Fetch data for intakeStats
    axios
      .get(`${process.env.REACT_APP_BACKEND}/dashboard/dailystats/intake`)
      .then((response) => {
        setIntakeStats(response.data);
        setLoadingIntakeStats(false);
      })
      .catch((error) => {
        console.error("Error fetching intakeStats data:", error);
        setLoadingIntakeStats(false);
      });

    // Fetch data for leaderboards
    axios
      .get(`${process.env.REACT_APP_BACKEND}/dashboard/rankings/daily`)
      .then((response) => {
        setLeaderboards(response.data);
        setLoadingLeaderboards(false);
      })
      .catch((error) => {
        console.error("Error fetching leaderboards data:", error);
        setLoadingLeaderboards(false);
      });

    // Fetch data for user count
    axios
      .get(`${process.env.REACT_APP_BACKEND}/dashboard/users/1/1`)
      .then((response) => {
        setUserCount(response.data.totalDocs);
        setLoadingUserCount(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoadingUserCount(false);
      });
  }, []);

  const handleOverviewIntervalChange = (interval) => {
    setOverviewInterval(interval);

    // Define API URLs based on the selected interval
    let intakeApiUrl, mealApiUrl;
    if (interval === "daily") {
      intakeApiUrl = `${process.env.REACT_APP_BACKEND}/dashboard/dailystats/intake`;
      mealApiUrl = `${process.env.REACT_APP_BACKEND}/dashboard/dailystats/meal`;
      setPhdData(dailyPhdData);
      setHaleData(dailyHaleData);
      setHAxisTitle("Day");
    } else if (interval === "weekly") {
      intakeApiUrl = `${process.env.REACT_APP_BACKEND}/dashboard/weeklystats/intake`;
      mealApiUrl = `${process.env.REACT_APP_BACKEND}/dashboard/weeklystats/meal`;
      setPhdData(weeklyPhdData);
      setHaleData(weeklyHaleData);
      setHAxisTitle("Date");
    } else if (interval === "monthly") {
      intakeApiUrl = `${process.env.REACT_APP_BACKEND}/dashboard/monthlystats/intake`;
      mealApiUrl = `${process.env.REACT_APP_BACKEND}/dashboard/monthlystats/meal`;
      setPhdData(monthlyPhdData);
      setHaleData(monthlyHaleData);
      setHAxisTitle("Month");
    }

    // Fetch data for mealStats
    axios
      .get(mealApiUrl)
      .then((response) => {
        setMealStats(response.data);
      })
      .catch((error) => {
        console.error("Error fetching mealStats data:", error);
      });

    // Fetch data for intakeStats
    axios
      .get(intakeApiUrl)
      .then((response) => {
        setIntakeStats(response.data);
      })
      .catch((error) => {
        console.error("Error fetching intakeStats data:", error);
      });
  };

  const handleLeaderboardIntervalChange = (interval) => {
    setLeaderboardInterval(interval);

    // Define API URL for leaderboards based on the selected interval
    let leaderboardApiUrl;
    if (interval === "daily") {
      leaderboardApiUrl = `${process.env.REACT_APP_BACKEND}/dashboard/rankings/daily`;
    } else if (interval === "weekly") {
      leaderboardApiUrl = `${process.env.REACT_APP_BACKEND}/dashboard/rankings/weekly`;
    } else if (interval === "monthly") {
      leaderboardApiUrl = `${process.env.REACT_APP_BACKEND}/dashboard/rankings/monthly`;
    }

    axios
      .get(leaderboardApiUrl)
      .then((response) => {
        setLeaderboards(response.data);
      })
      .catch((error) => {
        console.error("Error fetching leaderboards data:", error);
      });
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
              {loadingUserCount ? (
                <Spinner
                  animation="border"
                  role="status"
                  style={{ color: "#9FC856" }}
                />
              ) : (
                <>
                  <h5
                    style={{
                      marginTop: "20px",
                      marginBottom: "20px",
                      color: "#9FC856",
                      fontWeight: "600",
                    }}
                  >
                    Users
                  </h5>
                  <Row>
                    <Col md={3} sm={6} style={{ marginBottom: "20px" }}>
                      <AvgCard
                        icon={<FaPeopleGroup />}
                        label="Number of Users"
                        value={userCount}
                      />
                    </Col>
                    <Col md={3} sm={6} style={{ marginBottom: "20px" }}>
                      <AvgCard
                        icon={<FaWeightScale />}
                        label="Avg. BMI"
                        value={"19"}
                      />
                    </Col>
                    <Col md={3} sm={6} style={{ marginBottom: "20px" }}>
                      <AvgCard
                        icon={<GiBodyHeight />}
                        label="Avg. Height"
                        value={"170 cm"}
                      />
                    </Col>
                    <Col md={3} sm={6} style={{ marginBottom: "20px" }}>
                      <AvgCard
                        icon={<GiWeightScale />}
                        label="Avg. Weight"
                        value={"62 kg"}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} sm={12} style={{ marginBottom: "20px" }}>
                      <AvgCard
                        icon={<GiAges />}
                        label="Age Distribution"
                        value={
                          <Chart
                            width={"100%"}
                            height={"300px"}
                            chartType="ColumnChart"
                            loader={
                              <Spinner
                                animation="border"
                                role="status"
                                style={{ color: "#9FC856" }}
                              />
                            }
                            data={ageData}
                          />
                        }
                      />
                    </Col>

                    <Col md={6} sm={12} style={{ marginBottom: "20px" }}>
                      <AvgCard
                        icon={<PiGenderIntersexBold />}
                        label="Sex Distribution"
                        value={
                          <Chart
                            width={"100%"}
                            height={"300px"}
                            chartType="PieChart"
                            loader={
                              <Spinner
                                animation="border"
                                role="status"
                                style={{ color: "#9FC856" }}
                              />
                            }
                            data={SexData}
                          />
                        }
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} sm={12} style={{ marginBottom: "20px" }}>
                      <AvgCard
                        icon={<GiHealthCapsule />}
                        label="Percentage Distribution of Health Conditions"
                        value={
                          <Chart
                            width={"100%"}
                            height={"300px"}
                            chartType="PieChart"
                            loader={
                              <Spinner
                                animation="border"
                                role="status"
                                style={{ color: "#9FC856" }}
                              />
                            }
                            data={healthConditionData}
                          />
                        }
                      />
                    </Col>
                  </Row>
                </>
              )}

              <h5
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  color: "#9FC856",
                  fontWeight: "600",
                }}
              >
                Meals & Intakes
              </h5>
              <IntervalDropdown
                intervalOptions={intervalOptions}
                selectedInterval={overviewInterval}
                onIntervalChange={handleOverviewIntervalChange}
              />
            </div>

            {loadingIntakeStats ? (
              <Spinner
                animation="border"
                role="status"
                style={{ color: "#9FC856" }}
              />
            ) : (
              <>
                {intakeStats.map((stat, index) => (
                  <Row key={index}>
                    <Col md={3} sm={6} style={{ marginBottom: "20px" }}>
                      <AvgCard
                        icon={<GiHealthIncrease />}
                        label="Avg. HALE"
                        value={stat.hale.toFixed(2)}
                      />
                    </Col>
                    <Col md={3} sm={6} style={{ marginBottom: "20px" }}>
                      <AvgCard
                        icon={<FaPlateWheat />}
                        label="Avg. PHD"
                        value={stat.phd.toFixed(2)}
                      />
                    </Col>
                    <Col md={3} sm={6} style={{ marginBottom: "20px" }}>
                      <AvgCard
                        icon={<FaWalking />}
                        label="Avg. Steps"
                        value={stat.steps.toFixed(2)}
                      />
                    </Col>
                    <Col md={3} sm={6} style={{ marginBottom: "20px" }}>
                      <AvgCard
                        icon={<FaBed />}
                        label="Avg. Hours of Sleep"
                        value={stat.sleephrs.toFixed(2)}
                      />
                    </Col>
                    <Col md={3} sm={6} style={{ marginBottom: "20px" }}>
                      <AvgCard
                        icon={<FaGlassWater />}
                        label="Avg. Water Intake"
                        value={stat.waterglass.toFixed(2)}
                      />
                    </Col>
                  </Row>
                ))}
              </>
            )}

            {loadingMealStats ? (
              <Spinner
                animation="border"
                role="status"
                style={{ color: "#9FC856" }}
              />
            ) : (
              <>
                {mealStats.map((stat, index) => (
                  <Row key={index}>
                    <Col md={3} sm={6} style={{ marginBottom: "20px" }}>
                      <AvgCard
                        icon={<GiMeat />}
                        label=" Avg.Fats"
                        value={stat.fat.toFixed(2)}
                      />
                    </Col>
                    <Col md={3} sm={6} style={{ marginBottom: "20px" }}>
                      <AvgCard
                        icon={<FaBreadSlice />}
                        label="Avg. Carbohydrates"
                        value={stat.carbs.toFixed(2)}
                      />
                    </Col>
                    <Col md={3} sm={6} style={{ marginBottom: "20px" }}>
                      <AvgCard
                        icon={<GiChickenLeg />}
                        label="Avg. Proteins"
                        value={stat.proteins.toFixed(2)}
                      />
                    </Col>
                    <Col md={3} sm={6} style={{ marginBottom: "20px" }}>
                      <AvgCard
                        icon={<FaHamburger />}
                        label="Avg. Calories"
                        value={stat.cal.toFixed(2)}
                      />
                    </Col>
                    <Col md={3} sm={6} style={{ marginBottom: "20px" }}>
                      <AvgCard
                        icon={<FaTrashCan />}
                        label="Avg. Food Waste"
                        value={stat.waste.toFixed(2)}
                      />
                    </Col>
                  </Row>
                ))}
              </>
            )}

            <Row>
              <Col md={6} sm={12} style={{ marginBottom: "20px" }}>
                <AvgCard
                  icon={<FaPlateWheat />}
                  label="PHD Values"
                  value={
                    <Chart
                      width={"100%"}
                      height={"300px"}
                      chartType="LineChart"
                      loader={
                        <Spinner
                          animation="border"
                          role="status"
                          style={{ color: "#9FC856" }}
                        />
                      }
                      data={PhdData}
                      options={{
                        hAxis: { title: hAxisTitle },
                        vAxis: { title: "PhD Average" },
                      }}
                    />
                  }
                />
              </Col>

              <Col md={6} sm={12} style={{ marginBottom: "20px" }}>
                <AvgCard
                  icon={<GiHealthIncrease />}
                  label="HALE Values"
                  value={
                    <Chart
                      width={"100%"}
                      height={"300px"}
                      chartType="LineChart"
                      loader={
                        <Spinner
                          animation="border"
                          role="status"
                          style={{ color: "#9FC856" }}
                        />
                      }
                      data={HaleData}
                      options={{
                        hAxis: { title: hAxisTitle },
                        vAxis: { title: "HALE Average" },
                      }}
                    />
                  }
                />
              </Col>
            </Row>
            <Row>
              {overviewInterval === "daily" && (
                <Col md={6} sm={12} style={{ marginBottom: "20px" }}>
                  <AvgCard
                    icon={<GiMeal />}
                    label="Daily Meal Composition"
                    value={
                      <Chart
                        width={"100%"}
                        height={"300px"}
                        chartType="PieChart"
                        loader={
                          <Spinner
                            animation="border"
                            role="status"
                            style={{ color: "#9FC856" }}
                          />
                        }
                        data={dailyMealData}
                      />
                    }
                  />
                </Col>
              )}
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

            {loadingLeaderboards ? (
              <Spinner
                animation="border"
                role="status"
                style={{ color: "#9FC856" }}
              />
            ) : (
              <LeaderboardsTable data={leaderboards} />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
