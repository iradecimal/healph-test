import React from "react";
import { Nav, Image } from "react-bootstrap";
import { FaHome, FaUtensils, FaClipboard } from "react-icons/fa";
import { MdReport } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { useLocation } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  // const navigate = useNavigate();

  // async function handleLogoutSubmit(event) {
  //   event.preventDefault();
  //   try {
  //     console.log("Logout button clicked");
  //     const response = await axios.get("http://localhost:3000/admins/logout", {
  //       withCredentials: true, // Include credentials
  //     });

  //     if (response.status === 200) {
  //       console.log("Logout request successful");
  //       navigate("/");
  //     } else {
  //       console.log("Logout request failed");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  return (
    <div>
      <Nav className="sidebar col-md-2 flex-column d-none d-md-block">
        <Image
          src="HEALPH.png"
          alt="Sidebar Logo"
          fluid
          style={{ width: "150px", height: "auto" }}
        />

        <Nav.Item>
          <Nav.Link
            href="/dashboard"
            active={location.pathname === "/dashboard"}
          >
            <FaHome className="icon" />
            Dashboard
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="/dailyintakes"
            active={location.pathname === "/dailyintakes"}
          >
            <FaUtensils className="icon" />
            Daily Intakes
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="/mealviewer"
            active={location.pathname === "/mealviewer"}
          >
            <FaClipboard className="icon" />
            Meal Viewer
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/reports" active={location.pathname === "/reports"}>
            <MdReport className="icon" />
            Reports
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {/* 
      <Dropdown
        drop="up"
        className="sidebar-dropdown col-md-2 flex-column d-none d-md-block"
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image
            src="profpic.jpg"
            alt="Profile Picture"
            className="round-image"
          />
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            className="dropdown-text"
          >
            User user
          </Dropdown.Toggle>
        </div>
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleLogoutSubmit}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown> */}
    </div>
  );
};

export default Sidebar;
