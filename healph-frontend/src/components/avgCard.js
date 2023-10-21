import React from "react";
import { Card } from "react-bootstrap";

const AvgCard = ({ icon, label, value }) => (
  <Card
    style={{
      marginBottom: "10px",
      height: "100%",
      borderColor: "#9FC856",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    }}
  >
    <Card.Body>
      <div>
        <div>
          <Card.Title
            style={{
              marginBottom: "0.5rem",
              display: "flex",
              alignItems: "center",
              color: "#9FC856",
            }}
          >
            {icon}
            <span style={{ marginLeft: "10px", color: " #757575" }}>
              {label}
            </span>
          </Card.Title>
          <div style={{ fontWeight: "600" }}>{value}</div>
        </div>
      </div>
    </Card.Body>
  </Card>
);

export default AvgCard;
