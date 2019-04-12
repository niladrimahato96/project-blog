import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, } from 'reactstrap';

class ForgotPassword extends React.Component {
    render() {
        return (
            <Col md={{ size: 6, offset: 3 }}>
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email" id="exampleEmail" />
                    </FormGroup>

                    <Button>Submit</Button>
                </Form>
            </Col>
        );
    }
}

export default ForgotPassword;