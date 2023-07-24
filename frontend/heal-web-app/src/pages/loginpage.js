import React from "react";
import './loginpage.css';
import LoginForm from '../components/loginform';
import Footer from '../components/footer';
import { Container } from "react-bootstrap";


const LoginPage = () => {

    return (
      <div>
        <Container>
          <LoginForm/>
        </Container>
        <Footer/>
      </div>
      
    );
  };
  
  export default LoginPage;