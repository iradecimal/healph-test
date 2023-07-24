import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer style={{backgroundColor:"#9FC856",bottom:"0",position:"absolute",width:"100%"}}>
      <Container>
        <p style={{textAlign:"right",color:"white",marginTop:"10px",fontSize:"14px"}}>&copy; {new Date().getFullYear()} TeamMir4ge</p>
      </Container>
    </footer>
  );
};

export default Footer;