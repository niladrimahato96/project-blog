import React from 'react';
import {
    Col, Table, Button, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle,CardHeader, CardFooter, CardLink } from 'reactstrap';

class PostView extends React.Component {
    render() {
        return (
            <Col md={{ size: 6, offset: 3 }}>
                <Card>
                    {/* <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" /> */}
                    <CardHeader>
                        <CardTitle>Title</CardTitle>
                    </CardHeader>
                    
                    <CardBody>
                    <CardText>The quick brown fox jumps over a lazy dog.</CardText>
                    
                    </CardBody>
                </Card>
                
            </Col>
        );
    }
}

export default PostView;