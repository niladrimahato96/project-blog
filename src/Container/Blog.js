import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import Header from '../Components/Header';

import Registration from '../Components/Registration';
import Login from '../Components/Login';
import AllUsers from '../Components/AllUsers';
import ForgotPassword from '../Components/ForgotPassword';
import AddPost from '../Components/AddPost';
import AllPosts from '../Components/AllPosts';
import PostView from '../Components/PostView';
import EditPost from '../Components/EditPost';
import Home from '../Components/Home';
import EditUser from '../Components/EditUser';

class Blog extends Component {
    render() {
        return (
            <div className="Blog">
                <Header/>
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
                    <Route path="/" exact component={Home} />
                    <Route path="/add-user" exact component={Registration} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/all-users" exact component={AllUsers} />
                    <Route path="/forgot-password" exact component={ForgotPassword} />
                    <Route path="/add-post" exact component={AddPost} />
                    <Route path="/all-posts" exact component={AllPosts} />
                    <Route path="/post-view/:id" exact component={PostView} />
                    <Route path="/edit-post/:id" exact component={EditPost} />
                    <Route path="/edit-user/:id" exact component={EditUser} />
                </Switch>
            </div>
        );
    }
}

export default Blog;
