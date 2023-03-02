import axios from "axios";
import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const API_URL = "http://localhost:3001/login";

  const login = () => {
    const user = {
      username: username,
      password: password,
    };
    return axios.post(API_URL, user).then((response: any) => {
      console.log(response);
      console.log(response.status);
      if (response.status === 201) {
        navigate("/user");
        console.log(response);
        console.log(response.status);
      }
    });
  };

  return (
    <Container>
      <Form>
        <Container>
          <Row>
            <Col></Col>
            <Col>
              <h1>Login</h1>{" "}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="username"
                  placeholder="Enter username"
                  onChange={(e: any) => {
                    setUsername(e.target.value);
                  }}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e: any) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>
              <Button variant="primary" onClick={login}>
                Login
              </Button>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </Form>
    </Container>
  );
}

export default Login;
