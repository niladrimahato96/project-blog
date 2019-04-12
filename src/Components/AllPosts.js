import React from 'react';
import {
    Col, Table, Button, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle,CardHeader, CardFooter, CardLink, NavLink } from 'reactstrap';

class AllPosts extends React.Component {
    state = {
        authToken: ''
    }
    componentWillMount(){
        let authToken = sessionStorage.getItem("authToken");
        if(authToken == ''){
            this.props.history.push('/all-posts');
        }
    }
    render() {
        return (
            <Col md={{ size: 6, offset: 3 }}>
                <NavLink href="add-post">Add Post</NavLink>
                <Card>
                    <CardHeader>
                        <CardTitle>Title</CardTitle>
                    </CardHeader>
                    {/* <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" /> */}
                    <CardBody>
                    <CardText>The quick brown fox jumps over a lazy dog.</CardText>
                    
                    </CardBody>
                    <CardFooter>
                        <NavLink href="post-view">View</NavLink>
                        <NavLink href="post-edit">Edit</NavLink>
                        <NavLink href="post-delete">Delete</NavLink>
                    </CardFooter>
                </Card>
                
            </Col>
        );
    }
}

export default AllPosts;