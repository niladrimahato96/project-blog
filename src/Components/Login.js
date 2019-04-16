import React from 'react';
import {Col, Button, Form, NavLink, FormGroup, Label, Input, Spinner, Row } from 'reactstrap';
import axios from 'axios';

class Registration extends React.Component{

    state={
        email: '',
        password: '',
        token: '',
        loading: false
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
            this.setState({ loading: true });
            axios.post('https://node-shop-rest.herokuapp.com/api/user/login', {
                email: this.state.email,
                password: this.state.password
            })
            .then( response => {
                if (response.data.message == "Auth Successfull"){
                    sessionStorage.setItem("authToken", response.data.token);
                    this.setState({loading: false});
                    this.props.history.push('/all-posts');
                    
                }
            })
            .catch(function error(err){
                alert("Network Error");
                this.setState({loading: false});
            });
        }
    }

    // componentWillMount(){
    //     if(sessionStorage.getItem("authToken") == ''){
    //         this.props.history.push('/login');
    //     }
    // }
    render(){
        return(
            <div>
            <Row>
                    <Col md="12" style={{ textAlign: 'center', fontWeight: '800', fontSize: '150%', color: 'rgb(87, 87, 87)'}}>Admin Dashboard</Col>
            </Row>
            <Col md={{ size: 6, offset: 3 }} style={{marginTop: '8%'}}>
                        <Form>
                            <h4>Login</h4>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input type="email" value={this.state.email} onChange={this.emailHandler} name="email" id="exampleEmail"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input type="password" password={this.state.password} onChange={this.passwordHandler} name="password" id="examplePassword"/>
                            </FormGroup>

                            
                            <Row>
                                <Col md="8">
                                        <Button onClick={this.submitForm}>Submit</Button>{' '}
                                    {this.state.loading ? <Spinner color="info"/> : ''}
                                </Col>
                                <Col md="4">
                                    <NavLink href="/forgot-password">Forgot Password</NavLink>
                                </Col>
                            </Row>
                        </Form>
            </Col>
            </div>
        );
    }
}

export default Registration;