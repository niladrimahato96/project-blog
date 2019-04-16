import React from 'react';
import {
    Col,  Button, Badge, Card, CardImg, CardText, CardBody, Form, FormGroup, Label, Input, FormText,
    CardTitle, CardSubtitle,CardHeader, CardFooter, Row, NavLink, Modal,Spinner,  ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

// import { Redirect } from 'react-router-dom';    

import Header from './Header'    ;

class AllPosts extends React.Component {
    state = {
        authToken: '',
        posts: [],
        modal: false,
        modalView: false,
        selectedPostId: '',
        selectedPostTitle: '',
        selectedPostContent: '',
        selectedPostImage: '',
        loading: false,
        viewPostImage: '',
        viewPostTitle: '',
        viewPostContent: '',
        viewPostUserPostID: '' ,
    }
    componentDidMount(){
        let authToken = sessionStorage.getItem("authToken");
        axios.get('https://node-shop-rest.herokuapp.com/api/post/allpost', { headers: { "Authorization": `Bearer ${authToken}` } })
             .then(response => {
                 console.log(response.data);
                 this.setState({
                    authToken: authToken,
                    posts: response.data
                 });
             })
             .catch(function error(err){
                 console.log(err);
             })
    }
    componentWillMount() {
        if (sessionStorage.getItem("authToken") == '') {
            this.props.history.push('/login');
        }
    }

    viewPostHandler = (event, post) => {
        // console.log(post);
        this.setState({
            viewPostImage: post.postImage,
            viewPostTitle: post.title,
            viewPostContent: post.content,
            viewPostUserPostID: post.userPostID 
        });
        this.toggleView();
    }

    setTitleHandler = event => {
        console.log(event.target.value);
        this.setState({ selectedPostTitle: event.target.value });
    }

    setDescriptionHandler = event => {
        // console.log(event.target.value);
        this.setState({ selectedPostContent: event.target.value });
    }

    setImageHandler = event => {
        // console.log(event.target.value);
        this.setState({ selectedPostImage: event.target.files[0] });

    }

    editPostHandler = (event, post) => {
        // console.log(post);
        this.setState({
            selectedPostId: post._id,
            selectedPostTitle: post.title,
            selectedPostContent: post.content,
        });
        this.toggle();
    }

    deletePostHandler = (event, post) => {
        // console.log(post._id);
        axios.delete(`https://node-shop-rest.herokuapp.com/api/post/delete/${post._id}`,{
            headers: {
                "Authorization": `Bearer ${this.state.authToken}`,
            }
        }).then(response => {
            
            if(response.data.message = "post deleted"){
                alert("Post Deleted");
                window.location.reload();
            }
        })
        .catch(function error(err){
            console.log(err);
        });
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    toggleView = () => {
        this.setState(prevState => ({
            modalView: !prevState.modalView
        }));
    }

    submitFormHandler = () => {
        this.setState({loading: true});
        let formData = new FormData();
        formData.set('title', this.state.selectedPostTitle);
        formData.set('content', this.state.selectedPostContent);
        formData.append('postImage', this.state.selectedPostImage);
        axios.patch(`https://node-shop-rest.herokuapp.com/api/post/edit/${this.state.selectedPostId}`,formData,{
            headers: {
                "Authorization": `Bearer ${this.state.authToken}`
            }
        })
        .then(response => {
            this.setState({ loading: false });
            console.log(response);
            window.location.reload();
        })
        .catch(function error(err){
            console.log(err);
        })
    }


    render() {
        let posts = 'Fetching posts...';
        if(this.state.posts.length != 0){
            posts = this.state.posts.map((post,index) => (
                <Col md="4" style={{ marginTop: '20px', }}>
                    <Card key={index} >
                        <CardHeader style={{height: '80px', overflow: 'hidden', padding: '0px'}}>
                                    <CardImg top width="100%" src={`https://node-shop-rest.herokuapp.com/${post.postImage}`} alt='loading...' />
                        </CardHeader>
                        

                        <CardBody style={{height: '146px'}}>
                            <CardTitle style={{ 
                                    fontWeight: '700',
                                    fontSize: '105%',
                                    color: '#1058b4',
                                    fontFamily: 'sans-serif',
                                    wordSpacing: '2px'}}>
                                {post.title.length < 60 ? post.title : post.title.substr(0, 60)+'...'}
                            </CardTitle>
                            <CardText style={{
                                        fontSize: '81%',
                                        color: '#727272'}}
                                        >
                                {post.content.length < 120 ? post.content : post.content.substr(0, 120)+'...' }
                            </CardText>
                        </CardBody>
                        <CardFooter>
                            <Row>
                                <Col md="8">
                                    <Badge onClick={(event) => this.viewPostHandler(event, post)} color="success">view</Badge>{' '}
                                    <Badge onClick={(event) => this.editPostHandler(event, post)} color="info">Edit</Badge>{' '}
                                    <Badge onClick={(event) => this.deletePostHandler(event, post)} color="danger">Delete</Badge>
                                </Col>
                                {/* <Col md="4">Created By: </Col> */}
                            </Row>
                        </CardFooter>
                    </Card>
            </Col>
        ));
        }

        
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalBody>
                        <Form>
                        <FormGroup>
                            <Label for="exampleEmail">Title</Label>
                            <Input type="text" value={this.state.selectedPostTitle} onChange={this.setTitleHandler} name="title" id="exampleTitle" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">Description</Label>
                            <Input type="textarea" value={this.state.selectedPostContent} onChange={this.setDescriptionHandler} name="description" id="exampleDescription" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleFile">Image</Label>
                            <Input type="file" value={this.selectedPostImage} onChange={this.setImageHandler} name="file" id="exampleFile" />
                            <FormText color="muted">
                                This is some placeholder block-level help text for the above input.
                                It's a bit lighter and easily wraps to a new line.
                        </FormText>
                        </FormGroup>
                    </Form>
                    </ModalBody>
                    <ModalFooter>
                        {this.state.loading ? <Spinner color="info"/> : ''} {' '}<Button color="primary" onClick={this.submitFormHandler}>Submit</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal> 
                <Modal isOpen={this.state.modalView} toggle={this.toggleView} className={this.props.className}>
                    <ModalBody>
                        <Card>
                            <CardHeader style={{height: '160px', overflowY: 'auto', padding: '0px'}}>
                                <CardImg top width="100%" src={`https://node-shop-rest.herokuapp.com/${this.state.viewPostImage}`}  />
                            </CardHeader>
                            <CardBody style={{
                                maxHeight: '330px',
                                overflowY: 'scroll'}}>
                                <CardTitle style={{
                                            fontWeight: '700',
                                            color: '#103977',
                                            fontSize: '118%'}}>
                                            {this.state.viewPostTitle}
                                </CardTitle>
                                <CardSubtitle
                                    style={{
                                        color: '#5d5d5d',
                                        fontSize: '92%'
                            }}
                                >
                                {this.state.viewPostContent}
                                </CardSubtitle>
                            </CardBody>
                        </Card>
                    </ModalBody>
                    <ModalFooter>
                        
                        <Button color="secondary" onClick={this.toggleView}>Cancel</Button>
                    </ModalFooter>
                </Modal> 
                <Header {...this.props}/>
                <NavLink href="add-post" style={{marginLeft: '10%'}}>Add Post</NavLink>
                <Row style={{width: "80%", margin: '0px auto'}}>
                    {posts}
                </Row>
            </div>
        );
    }
}

export default AllPosts;