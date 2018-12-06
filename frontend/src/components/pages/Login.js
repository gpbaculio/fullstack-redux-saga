import React from "react";
import PropTypes from "prop-types";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap'
import { LoginForm } from "../forms";

const LoginPage = () => (
  <Container style={{ height: "100vh" }}>
    <Row className="align-items-center justify-content-center" style={{ height: "100vh" }}>
      <Col xs="12" sm="8" lg="6">
        <Card>
          <CardHeader>Welcome Back!</CardHeader>
          <CardBody>
            <LoginForm />
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
);

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
};

export default LoginPage;
