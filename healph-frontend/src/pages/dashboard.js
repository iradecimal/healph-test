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
} from "react-icons/fa6";
import { GiHealthIncrease, GiChickenLeg, GiMeat } from "react-icons/gi";
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

  useEffect(() => {
    // Fetch data for mealStats
    axios
      .get(`http://localhost:3000/dashboard/dailystats/meal`)
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
      .get(`http://localhost:3000/dashboard/dailystats/intake`)
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
      .get(`http://localhost:3000/dashboard/rankings/daily`)
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
      .get(`http://localhost:3000/dashboard/users/1/1`)
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
      intakeApiUrl = "http://localhost:3000/dashboard/dailystats/intake";
      mealApiUrl = "http://localhost:3000/dashboard/dailystats/meal";
    } else if (interval === "weekly") {
      intakeApiUrl = "http://localhost:3000/dashboard/weeklystats/intake";
      mealApiUrl = "http://localhost:3000/dashboard/weeklystats/meal";
    } else if (interval === "monthly") {
      intakeApiUrl = "http://localhost:3000/dashboard/monthlystats/intake";
      mealApiUrl = "http://localhost:3000/dashboard/monthlystats/meal";
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
      leaderboardApiUrl = "http://localhost:3000/dashboard/rankings/daily";
    } else if (interval === "weekly") {
      leaderboardApiUrl = "http://localhost:3000/dashboard/rankings/weekly";
    } else if (interval === "monthly") {
      leaderboardApiUrl = "http://localhost:3000/dashboard/rankings/monthly";
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
                  <Col md={3} sm={6} style={{ marginBottom: "20px" }}>
                    <AvgCard
                      icon={<FaPeopleGroup />}
                      label="Number of Users"
                      value={userCount}
                    />
                  </Col>
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
                        label="Fats"
                        value={stat.fat.toFixed(2)}
                      />
                    </Col>
                    <Col md={3} sm={6} style={{ marginBottom: "20px" }}>
                      <AvgCard
                        icon={<FaBreadSlice />}
                        label="Carbohydrates"
                        value={stat.carbs.toFixed(2)}
                      />
                    </Col>
                    <Col md={3} sm={6} style={{ marginBottom: "20px" }}>
                      <AvgCard
                        icon={<GiChickenLeg />}
                        label="Proteins"
                        value={stat.proteins.toFixed(2)}
                      />
                    </Col>
                    <Col md={3} sm={6} style={{ marginBottom: "20px" }}>
                      <AvgCard
                        icon={<FaHamburger />}
                        label="Calories"
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
