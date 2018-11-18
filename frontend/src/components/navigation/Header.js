import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';
import { Link } from 'react-router-dom'

export default class Example extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        const { isOpen } = this.state
        this.setState({
            isOpen: !isOpen
        });
    }

    render() {
        const { isOpen } = this.state
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <div className="container" >
                        <NavbarBrand href="/">Fullstack Redux Saga</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Link className="nav-link text-center" to="/login">
                                        Login
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link className="nav-link text-center" to="/signup">
                                        Signup
                                    </Link>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </div>
        );
    }
}