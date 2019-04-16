import React from 'react';
import Header from './Header';
import {
    Col, Button, Form, FormGroup, Label, Input,
     Row } from 'reactstrap';

class ChangePassword extends React.Component{

    state={
        currPassword: '',
        newPassword: '',
        confirmPassword: '',
    }

    setCurrentPasswordHandler = event => {
        console.log(event.target.value);
        this.setState({
            currPassword: event.target.value
        })
    }

    setNewPasswordHandler = event => {
        console.log(event.target.value);
        this.setState({
            newPassword: event.target.value
        })
    }

    setConfirmPasswordHandler = event => {
        console.log(event.target.value);
        this.setState({
            confirmPassword: event.target.value
        })
    }

    submitFormHandler = () => {
        if(this.state.currPassword === '' || this.state.newPassword === '' || this.state.confirmPassword === ''){
            alert(" All Fields are required!");
        }else{
            if(this.state.newPassword != this.state.confirmPassword){
                alert(" New & Confirm Password don't match!");
            }else{

            }
        }
    }
    
    componentWillMount() {
        if (sessionStorage.getItem("authToken") == '') {
            this.props.history.push('/login');
        }
    }

    render(){
        return(
            <div>
                <Header  {...this.props}/>
                <Row style={{width: '40%', margin: '0 auto'}}>
                    <Col md="12">
                        <Form>
                        <FormGroup>
                            <Label for="currPassword">Current Password</Label>
                            <Input type="password" value={this.state.currPassword} onChange={this.setCurrentPasswordHandler} id="currPassword" name="currPassword" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="newPassword">New Password</Label>
                            <Input type="password" value={this.state.newPassword} onChange={this.setNewPasswordHandler} name="newpassword" id="newPassword" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="confirmPassword">Confirm Password</Label>
                            <Input type="password" value={this.state.confirmPassword} onChange={this.setConfirmPasswordHandler} name="confirmpassword" id="confirmPassword" />
                        </FormGroup>
                        
                        <Button onClick={this.submitFormHandler}>Submit</Button>
                    </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ChangePassword;