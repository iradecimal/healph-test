import { Form, Button, Card, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./loginform.css";
import { React, useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();

  async function handleLoginSubmit(event) {
    event.preventDefault();
    try {
      await axios
        .post("http://localhost:3000/users/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          nav("/dashboard");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
    try {
      await axios
        .post(
          "http://localhost:3000/admins/login",
          {
            email: email,
            password: password,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          nav("/dashboard");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ paddingBottom: "75px" }}
    >
      <img
        src="HEALPH.png"
        alt="Logo"
        style={{ width: "200px", height: "auto" }}
      />
      <Card
        style={{
          width: "400px",
          padding: "20px",
          border: "none",
        }}
      >
        <h4 style={{ textAlign: "center", marginBottom: "40px" }}>Login</h4>
        <Form style={{ marginBottom: "30px" }}>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group style={{ marginBottom: "10px" }}>
            <Form.Label>Password</Form.Label>
            <InputGroup style={{ width: "350px" }}>
              <Form.Control
                type={showPassword ? "text" : "password"}
                className="login-input"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <InputGroup.Text
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="login"
            onClick={handleLoginSubmit}
          >
            LOGIN
          </Button>
        </Form>
        <div style={{ textAlign: "center", fontSize: "14px" }}>
          Not registered?{" "}
          <a href="/register" style={{ color: "#9FC856" }}>
            Register
          </a>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
