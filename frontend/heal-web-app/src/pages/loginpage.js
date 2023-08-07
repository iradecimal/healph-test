import React from "react";
import LoginForm from "../components/loginform";
// import Footer from "../components/footer";
import { Container } from "react-bootstrap";

const LoginPage = () => {
  return (
    <div style={{ overflowY: "auto" }}>
      <Container>
        <LoginForm />
      </Container>
      {/* <Footer /> */}
    </div>
  );
};

export default LoginPage;
