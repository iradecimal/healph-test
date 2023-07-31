import React from "react";
import RegisterForm from "../components/registerform";
import Footer from '../components/footer';
import { Container } from "react-bootstrap";

const LoginPage = () => {
  return (
    <div>
    <Container>
      <RegisterForm/>
    </Container>
    <Footer/>
  </div>
  );
};

export default LoginPage;