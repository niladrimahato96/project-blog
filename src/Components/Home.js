import React from 'react';
import { Col } from 'reactstrap';

import Header from './Header';

const Home = props => {
    return (<div>
        <Header {...props}/>
        <Col md={{ size: 5, offset: 5 }}>
            <h1 style={{ marginTop: "25%" }}>HI!</h1>
        </Col>
    </div>);
}

export default Home;