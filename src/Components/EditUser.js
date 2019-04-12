import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, } from 'reactstrap';

class EditUser extends React.Component {
    render() {
        return (
            <Col md={{ size: 6, offset: 3 }}>
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Full Name</Label>
                        <Input type="text" name="fullname" id="exampleName" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email" id="exampleEmail" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Phone Number</Label>
                        <Input type="number" name="phone" id="examplePhone" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="examplePassword" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Confirm Password</Label>
                        <Input type="password" name="confirmpassword" id="exampleConfirmPassword" />
                    </FormGroup>

                    <Button>Submit</Button>
                </Form>
            </Col>
        );
    }
}

export default EditUser;