import React from 'react';
import { Row, Col, Button, Form, FormGroup, Label, Input, NavLink} from 'reactstrap';

class ForgotPassword extends React.Component {
    state={
        email: '',
    }
    setEmailHandler = event => {
        this.setState({
            email: event.target.value
        });
    }

    submitFormHandler = () => {
        if(this.state.email === ''){
            alert("Email Required!");
        }
    }
    render() {
        return (
            <div>
            <Row>
                <Col md="12" style={{ textAlign: 'center', fontWeight: '800', fontSize: '150%', color: 'rgb(87, 87, 87)' }}>Admin Dashboard</Col>
            </Row>
            <Col md={{ size: 6, offset: 3 }} style={{marginTop: '10%'}}>
                <Form>
                    <h4>Forgot Password</h4>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" value={this.state.email} onChange={this.setEmailHandler} name="email" id="exampleEmail" />
                    </FormGroup>

                    
                    <Row>
                                <Col md="8">
                                <Button onClick={this.submitFormHandler}>Submit</Button>
                                </Col>
                                <Col md="4">
                                    <NavLink href="/login">Login Here</NavLink>
                                </Col>
                            </Row>
                </Form>
            </Col>
            </div>
        );
    }
}

export default ForgotPassword;