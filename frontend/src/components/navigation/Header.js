import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
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
        const { authorized } = this.props
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <div className="container" >
                        <NavbarBrand href="/">Fullstack Redux Saga</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {authorized ? (
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
                                    </NavItem>) : (
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
                    </div>
                </Navbar>
            </div>
        );
    }
}

Header.propTypes = {
    authorized: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    authorized: !!state.user.email
})

export default connect(mapStateToProps, { userLoggedOut })(Header)