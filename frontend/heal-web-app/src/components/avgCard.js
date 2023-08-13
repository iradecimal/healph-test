import React from "react";
import { Card } from "react-bootstrap";

const AvgCard = ({ icon, label, value }) => (
  <Card
    style={{
      marginBottom: "10px",
      height: "100%",
      borderColor: "#9FC856",
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
          <Card.Text style={{ fontWeight: "600" }}>{value}</Card.Text>
        </div>
      </div>
    </Card.Body>
  </Card>
);

export default AvgCard;
