import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class EditPost extends React.Component {
    render() {
        return (
            <Col md={{ size: 6, offset: 3 }}>
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Title</Label>
                        <Input type="text" name="title" id="exampleTitle" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Description</Label>
                        <Input type="textarea" name="description" id="exampleDescription" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleFile">Image</Label>
                        <Input type="file" name="file" id="exampleFile" />
                        <FormText color="muted">
                            This is some placeholder block-level help text for the above input.
                            It's a bit lighter and easily wraps to a new line.
                        </FormText>
                    </FormGroup>

                    <Button>Submit</Button>
                </Form>
            </Col>
        );
    }
}

export default EditPost;