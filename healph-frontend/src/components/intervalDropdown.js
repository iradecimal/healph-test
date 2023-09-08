import React from "react";
import { Dropdown } from "react-bootstrap";
import "./intervalDropdown.css";

const IntervalDropdown = ({
  intervalOptions,
  selectedInterval,
  onIntervalChange,
}) => {
  return (
    <Dropdown className="interval-dropdown">
      <Dropdown.Toggle className="dropdown-toggle">
        {selectedInterval.charAt(0).toUpperCase() + selectedInterval.slice(1)}
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu">
        {intervalOptions.map((option) => (
          <Dropdown.Item
            key={option}
            onClick={() => onIntervalChange(option)}
            className="dropdown-item"
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default IntervalDropdown;
