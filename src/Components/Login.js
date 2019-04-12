import React from 'react';
import {Col, Button, Form, FormGroup, Label, Input, } from 'reactstrap';
import axios from 'axios';

class Registration extends React.Component{

    state={
        email: '',
        password: '',
        token: '',
    }

    emailHandler = event => {
        this.setState({
            email: event.target.value
        });
    }

    passwordHandler = event => {
        this.setState({
            password: event.target.value
        });
    }

    submitForm = () => {
        console.log(this.state.email+" "+this.state.password);
        if(this.state.email == '' || this.state.password == ''){
            alert("All fields are required!");
        }else{
            axios.post('https://node-shop-rest.herokuapp.com/api/user/login', {
                email: this.state.email,
                password: this.state.password
            })
            .then( response => {
                if (response.data.message == "Auth Successfull"){
                    sessionStorage.setItem("authToken", response.data.token);
                    this.props.history.push('/all-posts');
                }
            })
            .catch(function error(err){
                console.log(err);
            });
        }
    }
    render(){
        return(
            <Col md={{ size: 6, offset: 3 }}>
                        <Form>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input type="email" value={this.state.email} onChange={this.emailHandler} name="email" id="exampleEmail"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input type="password" password={this.state.password} onChange={this.passwordHandler} name="password" id="examplePassword"/>
                            </FormGroup>

                            <Button onClick={this.submitForm}>Submit</Button>
                        </Form>
            </Col>
        );
    }
}

export default Registration;