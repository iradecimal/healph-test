import React from "react";
import { Navbar, Image, Nav } from "react-bootstrap";
import { FaHome, FaUtensils, FaClipboard,FaCog,FaSignOutAlt } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import "./hamburgermenu.css";

const HamburgerMenu = () => {
  const location = useLocation();
  return (
    <Navbar expand="md" className="d-block d-md-none">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Navbar.Brand>
          <Image src="HEALPH.png" alt="Sidebar Logo" fluid />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      </div>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/dashboard" active={location.pathname === "/dashboard"}>
            <FaHome className="icon" />
            Dashboard
          </Nav.Link>
          <Nav.Link href="/dailyintakes" active={location.pathname === "/dailyintakes"}>
            <FaUtensils className="icon" />
            Daily Intakes
          </Nav.Link>


          <Nav.Link href="/mealviewer" active={location.pathname === "/mealviewer"}>
            <FaClipboard className="icon" />
            Meal Viewer
          </Nav.Link>

          <div className="divider" />
          <Nav.Link href="/settings" active={location.pathname === "/settings"}>
            <FaCog className="icon" />
            User Settings
          </Nav.Link>
          <Nav.Link href="/" active={location.pathname === "/"}>
            <FaSignOutAlt className="icon" />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default HamburgerMenu;

