import React, {Fragment} from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

class Header extends React.Component {

    state = {
        authToken: ''
    }

    logoutHandler = () => {
        console.log('clicked');
        sessionStorage.setItem("authToken", '');
        this.setState({ authToken: ''});
        this.props.history.push('/login');
        // window.reload();
    }

    componentDidMount(){
        console.log("header.js componentDidMount");
        this.setState({
            authToken: sessionStorage.getItem("authToken")
        });
    }

    render(){
        // let navMenu = (
        //     <Fragment>
        //         <NavItem>
        //             <NavLink href="login">Login</NavLink>
        //         </NavItem>
        //         <NavItem>
        //             <NavLink href="forgot-password">Forgot Password</NavLink>
        //         </NavItem>
        //     </Fragment>

        // );
        // if (this.state.authToken != '') {
        //     navMenu = (
                
        //     );
        // }

        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Project Blog</NavbarBrand>
                    <Nav className="ml-auto" navbar>
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
                        <NavLink href="change-password">Change Password</NavLink>
                    </NavItem>
                </Fragment>
                    </Nav>
                </Navbar>
            </div>
        )
    }
};

export default Header;