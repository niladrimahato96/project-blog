import React from 'react';
import {Col, Button, Form, FormGroup, Label, Input, } from 'reactstrap';
import axios from 'axios';

class Registration extends React.Component{
    state = {
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    }

    nameHandler = event => {
        this.setState({
            name: event.target.value
        });
    }

    emailHandler = event => {
        this.setState({
            email: event.target.value
        });
    }

    phoneHandler = event => {
        this.setState({
            phone: event.target.value
        });
    }

    passwordHandler = event => {
        this.setState({
            password: event.target.value
        });
    }

    confirmPasswordHandler = event => {
        this.setState({
            confirmPassword: event.target.value
        });
    }

    submitDataHandler = () => {
        if(this.state.email == '' || this.state.password == '' || this.state.name == ''){
            alert("Please fill all fields");
        } else if (this.state.password != this.state.confirmPassword) {
            alert("Password's doesn't match!");
        }else{
            axios.post('https://node-shop-rest.herokuapp.com/user/signup', {
                    name: this.state.name,
                    email: this.state.email,
                    phone: this.state.phone,
                    password: this.state.password
                })
                .then(response => {
                    console.log(response);
                    if(response.data.message == "user created"){
                        alert("User Created Successfully");
                        this.props.history.push('/all-users');
                    }else if(response.data.message == "email already exists"){
                        alert("Note: User created successfully. But email already exists.");
                    }else{
                        alert("Something went wrong!");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }


    }

    render(){
        return(
            <Col md={{ size: 6, offset: 3 }}>
                        <Form>
                            <FormGroup>
                                <Label for="exampleEmail">Full Name</Label>
                                <Input type="text" name="fullname" onChange={event => this.nameHandler(event)} id="exampleName"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input type="email" onChange={event => this.emailHandler(event)} name="email" id="exampleEmail"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Phone Number</Label>
                                <Input type="number" onChange={event => this.phoneHandler(event)} name="phone" id="examplePhone"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input type="password" onChange={event => this.passwordHandler(event)} name="password" id="examplePassword"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Confirm Password</Label>
                                <Input type="password" onChange={event => this.confirmPasswordHandler(event)} name="confirmpassword" id="exampleConfirmPassword"/>
                            </FormGroup>

                            <Button onClick={this.submitDataHandler}>Submit</Button>
                        </Form>
            </Col>
        );
    }
}

export default Registration;