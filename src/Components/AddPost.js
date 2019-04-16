import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Spinner } from 'reactstrap';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

import Header from './Header';

class AddPost extends React.Component {
    state = {
        title: '',
        description: '',
        image: '',
        authToken: '',
        loading: false,
        redirect: false,
    }
    componentWillMount() {
        if (sessionStorage.getItem("authToken") == '') {
            this.props.history.push('/login');
        }
    }

    setTitleHandler = event => {
        console.log(event.target.value);
        this.setState({title: event.target.value});
    }

    setDescriptionHandler = event => {
        console.log(event.target.value);
        this.setState({description: event.target.value});
    }

    setImageHandler = event => {
        console.log(event.target.value);
        // let formData = new FormData();
        // formData.set('')
        // formData.append('postImage', event.target.files[0]);
        this.setState({image: event.target.files[0]});
        
    }

    submitFormHandler = () => {
        this.setState({loading: true});
        let formData = new FormData();
        formData.set('title', this.state.title);
        formData.set('content', this.state.description);
        formData.append('postImage', this.state.image);
        axios.post('https://node-shop-rest.herokuapp.com/api/post/create',formData,{
            headers: {
                "Authorization": `Bearer ${this.state.authToken}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            this.setState({loading: false, redirect: true});
            console.log(response);
        })
        .catch(function error(err){
            this.setState({loading: false});
            console.log(err);
        })
    }

    componentDidMount(){
        let authToken = sessionStorage.getItem("authToken");
        this.setState({authToken});
    }

    render() {
        let redirect = (<Redirect to="/all-posts"/>);
        console.log(this.state.authToken);
        return (
            <div>
                {this.state.redirect ? redirect : null}
                <Header {...this.props}/>
                <Col md={{ size: 6, offset: 3 }}>
                    <Form>
                        <FormGroup>
                            <Label for="exampleEmail">Title</Label>
                            <Input type="text" onChange={this.setTitleHandler} name="title" id="exampleTitle" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">Description</Label>
                            <Input type="textarea" onChange={this.setDescriptionHandler} name="description" id="exampleDescription" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleFile">Image</Label>
                            <Input type="file" onChange={this.setImageHandler} name="file" id="exampleFile" />
                            <FormText color="muted">
                                This is some placeholder block-level help text for the above input.
                                It's a bit lighter and easily wraps to a new line.
                        </FormText>
                        </FormGroup>

                        <Button onClick={this.submitFormHandler}>Submit</Button>{' '}{this.state.loading ? <Spinner color="info" /> : ''}
                    </Form>
                </Col>
            </div>
        );
    }
}

export default AddPost;