import { Form, Button, Card, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './loginform.css';
import { React, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [confpassword, setconfPassword] = useState('');
  const [showconfPassword, setShowconfPassword] = useState(false); 

  const handleLoginSubmit = (event) => {
    event.preventDefault();

  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };

  const toggleconfPasswordVisibility = () => {
    setShowconfPassword(!showconfPassword); 
  };


  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "90vh" }}>
      <div style={{ marginBottom: "20px" }}>
        <img src="HEALPH.png" alt="Logo" style={{ width: "150px", height: "auto" }} />
      </div>

      <Card style={{ width: '400px', padding: '20px', border: "none" }}>
        <h4 style={{ textAlign: "center",marginBottom:"40px" }}>Register</h4>
        <Form style={{ marginBottom: "30px" }}>



          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter first name" value={firstname} onChange={(e) => setFirstName(e.target.value)} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter last name" value={lastname} onChange={(e) => setLastName(e.target.value)} />
          </Form.Group>


          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group style={{ marginBottom: "10px" }}>
            <Form.Label>Password</Form.Label>
            <InputGroup style={{width:"350px"}}>
              <Form.Control
                type={showPassword ? 'text' : 'password'} 
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              
              <InputGroup.Text onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>


          <Form.Group style={{ marginBottom: "10px" }}>
            <Form.Label>Confirm password</Form.Label>
            <InputGroup style={{width:"350px"}}>
              <Form.Control
                type={showconfPassword ? 'text' : 'password'} 
                placeholder="Repeat password"
                value={confpassword}
                onChange={(e) => setconfPassword(e.target.value)}
              />
              
              <InputGroup.Text onClick={toggleconfPasswordVisibility} style={{ cursor: 'pointer' }}>
                {showconfPassword ? <FaEyeSlash /> : <FaEye />}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>


          <Button variant="primary" type="submit" className='login' onClick={handleLoginSubmit}>
            REGISTER
          </Button>
        </Form>
        <div style={{ textAlign: "center", fontSize: '14px' }}>Already have an account? <a href="/" style={{ color: '#9FC856' }}>Login</a></div>

      </Card>
    </div>
  );
};

export default RegisterForm;