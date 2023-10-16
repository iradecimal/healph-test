import React from "react";
import { Navbar, Image, Nav } from "react-bootstrap";
import { FaHome, FaUtensils, FaClipboard } from "react-icons/fa";
import { MdReport } from "react-icons/md";
import { useLocation } from "react-router-dom";
import "./hamburgermenu.css";

const HamburgerMenu = () => {
  const location = useLocation();
  return (
    <Navbar expand="md" className="d-block d-md-none">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Navbar.Brand>
          <Image src="HEALPH.png" alt="Sidebar Logo" fluid />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      </div>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link
            href="/dashboard"
            active={location.pathname === "/dashboard"}
          >
            <FaHome className="icon" />
            Dashboard
          </Nav.Link>
          <Nav.Link
            href="/dailyintakes"
            active={location.pathname === "/dailyintakes"}
          >
            <FaUtensils className="icon" />
            Daily Intakes
          </Nav.Link>

          <Nav.Link
            href="/mealviewer"
            active={location.pathname === "/mealviewer"}
          >
            <FaClipboard className="icon" />
            Meal Viewer
          </Nav.Link>

          <Nav.Link href="/reports" active={location.pathname === "/reports"}>
            <MdReport className="icon" />
            Reports
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default HamburgerMenu;
