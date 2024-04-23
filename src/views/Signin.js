import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";
import { loginAdmin } from "../redux/actions/Users"; // Assuming action.js is in the same directory
import { Redirect, withRouter } from "react-router";

function Signin(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const success = await dispatch(loginAdmin(email, password));
      if (success) {
        props.history.push("/admin/dashboard");
      } else {
        setError("Invalid email or password"); // Set error message for display
      }
    } catch (error) {
      setError("An error occurred"); // Set error message for display
    }
  };


  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="6">
          <Card>
            <Card.Body>
              <Form onSubmit={handleLogin}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                {error && <div className="text-danger mb-3">{error}</div>}

                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default withRouter(Signin);
