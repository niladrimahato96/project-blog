import React, {Fragment} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

class Header extends React.Component {

    state = {
        authToken: ''
    }

    logoutHandler = () => {
        console.log('clicked');
        sessionStorage.setItem("authToken", '');
        this.setState({ authToken: ''});
        // this.props.history.push('/login');
    }

    componentDidMount(){
        console.log("header.js componentDidMount");
        this.setState({
            authToken: sessionStorage.getItem("authToken")
        });
    }

    render(){
        let navMenu = (
            <Fragment>
                <NavItem>
                    <NavLink href="login">Login</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="forgot-password">Forgot Password</NavLink>
                </NavItem>
            </Fragment>

        );
        if (this.state.authToken != '') {
            navMenu = (
                <Fragment>
                    <NavItem>
                        <NavLink href="all-posts">All Posts</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="all-users">All Users</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={this.logoutHandler}>Logout</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="forgot-password">Change Password</NavLink>
                    </NavItem>
                </Fragment>
            );
        }

        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Project Blog</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        {navMenu}
                    </Nav>
                </Navbar>
            </div>
        )
    }
};

export default Header;