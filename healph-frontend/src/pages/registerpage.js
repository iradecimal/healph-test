import React from "react";
import RegisterForm from "../components/registerform";
// import Footer from "../components/footer";
import { Container } from "react-bootstrap";

const RegisterPage = () => {

  return (
    <div style={{ overflowY: "auto" }}>
      <Container>
        <RegisterForm />
      </Container>
      {/* <Footer /> */}
    </div>
  );
};

export default RegisterPage;
