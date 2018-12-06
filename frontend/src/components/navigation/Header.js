import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

import { userLoggedOut } from '../../actions/auth'

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    logOut = async (e) => {
        e.preventDefault();
        localStorage.removeItem('gpbTodosJWT')
        const { userLoggedOut: userLoggedOutAction } = this.props
        userLoggedOutAction()
    };

    toggle() {
        const { isOpen } = this.state
        this.setState({
            isOpen: !isOpen
        });
    }

    render() {
        const { isOpen } = this.state
        const { email } = this.props
        return (
            <React.Fragment>
                <Navbar color="light" light expand="md">
                    <Container>
                        <Link to='/home' className="navbar-brand">
                            Glendon Philipp Baculio
                        </Link>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {email ? (
                                    <React.Fragment>
                                        <NavItem>
                                            <NavLink disabled href="#">{email}</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <button
                                                type="button"
                                                style={{
                                                    backgroundColor: '#F8F9FA',
                                                    border: 'none',
                                                    cursor: 'pointer'
                                                }}
                                                className="nav-link"
                                                onClick={this.logOut}
                                            >
                                                Logout
                                        </button>
                                        </NavItem>
                                    </React.Fragment>) : (
                                        <React.Fragment>
                                            <NavItem>
                                                <Link className="nav-link" to="/login">
                                                    Login
                                                </Link>
                                            </NavItem>
                                            <NavItem>
                                                <Link className="nav-link" to="/signup">
                                                    Signup
                                                </Link>
                                            </NavItem>
                                        </React.Fragment>
                                    )}
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </React.Fragment>
        );
    }
}

Header.propTypes = {
    email: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
    email: state.user.email
})

export default connect(mapStateToProps, { userLoggedOut })(withRouter(Header))