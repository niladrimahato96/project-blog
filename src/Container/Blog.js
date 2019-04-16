import React, { Component } from 'react';
import { Route,  Switch,  } from 'react-router-dom';

import Registration from '../Components/Registration';
import Login from '../Components/Login';
import AllUsers from '../Components/AllUsers';
import ForgotPassword from '../Components/ForgotPassword';
import AddPost from '../Components/AddPost';
import AllPosts from '../Components/AllPosts';
// import PostView from '../Components/PostView';
import EditPost from '../Components/EditPost';
import Home from '../Components/Home';
import EditUser from '../Components/EditUser';
import ChangePassword from '../Components/ChangePassword';

class Blog extends Component {
    state = {
        loggedIn: false
    }
    checkloggedIn = () => {
        this.setState({
            loggedIn: !this.state.loggedIn
        });
    }
    render() {
        return (
            <div>
                
                {/* <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                to="/"
                                exact
                                activeClassName="active">Home</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header> */}
                <Switch>
                    <Route path="/" exact component={(routeProps) => <Home {...routeProps}/>} />
                    <Route path="/add-user" exact component={(routeProps) => <Registration {...routeProps}/>} />
                    <Route path="/login" exact component={(routeProps) => <Login {...routeProps}/>} />
                    <Route path="/all-users" exact component={(routeProps) => <AllUsers {...routeProps}/>} />
                    <Route path="/forgot-password" exact component={(routeProps) => <ForgotPassword {...routeProps} />} />
                    <Route path="/change-password" exact component={(routeProps) => <ChangePassword {...routeProps} />} />
                    <Route path="/add-post" exact component={(routeProps) => <AddPost {...routeProps}/>} />
                    <Route path="/all-posts" exact component={(routeProps) => <AllPosts {...routeProps}/>} />
                    {/* <Route path="/post-view/:id" exact component={(routeProps) => <PostView {...routeProps}/>} /> */}
                    <Route path="/edit-post/:id" exact component={(routeProps) => <EditPost {...routeProps}/>} />
                    <Route path="/edit-user/:id" exact component={(routeProps) => <EditUser {...routeProps} />} />
                </Switch>
            </div>
        );
    }
}

export default Blog;
