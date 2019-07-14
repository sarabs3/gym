import React from 'react';
import { Button, Card  } from 'antd';

const TodayStatus = (props) => (
    <Card >
        <h3>Did you went to gym Today?</h3>
        <Button type="primary" onClick={() => props.gymResponse(true)}>Yes</Button>
        <Button onClick={() => props.gymResponse(false)}>No</Button>
    </Card >
);

// Container
export default TodayStatus;
