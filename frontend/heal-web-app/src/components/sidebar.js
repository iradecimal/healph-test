import React from "react";
import { Nav, Image } from "react-bootstrap";
import { FaHome, FaUtensils, FaClipboard, FaCog } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import './sidebar.css';

const Sidebar = () => {
  const location = useLocation(); // Get the current location from React Router

  return (
    <Nav className="sidebar col-md-2 flex-column d-none d-md-block">
      <div className="image-container">
        <Image
          src="HEALPH.png" 
          alt="Sidebar Logo"
          fluid
        />
      </div>
    
      <Nav.Item>
        <Nav.Link href="/dashboard" active={location.pathname === "/dashboard"}>
          <FaHome className="icon" />
          Dashboard
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/dailyintakes" active={location.pathname === "/dailyintakes"}>
          <FaUtensils className="icon" />
          Daily Intakes
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/mealviewer" active={location.pathname === "/mealviewer"}>
          <FaClipboard className="icon" />
          Meal Viewer
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/settings" active={location.pathname === "/settings"}>
          <FaCog className="icon" />
          Settings
        </Nav.Link>
      </Nav.Item>

    </Nav>
  );
};

export default Sidebar;