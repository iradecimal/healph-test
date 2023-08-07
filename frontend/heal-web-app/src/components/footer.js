import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{ backgroundColor: "#9FC856", width: "100%", padding: "10px 0" }}
    >
      <Container>
        <p
          style={{
            textAlign: "right",
            color: "white",
            fontSize: "14px",
            margin: 0,
          }}
        >
          &copy; {new Date().getFullYear()} TeamMir4ge
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
