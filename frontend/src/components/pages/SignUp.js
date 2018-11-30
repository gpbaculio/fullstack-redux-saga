import React from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
} from 'reactstrap'
import { SignUpForm } from "../forms";

const SignupPage = () => (
    <Container style={{ height: "100vh" }}>
        <Row className="align-items-center" style={{ height: "100vh" }}>
            <Col xs="12" sm="8" lg="6">
                <Card>
                    <CardHeader>Join the Club!</CardHeader>
                    <CardBody>
                        <SignUpForm />
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </Container>
);

export default SignupPage;
