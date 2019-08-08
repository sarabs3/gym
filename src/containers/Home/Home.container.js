import React from 'react';
import { Link } from 'react-router-dom';
import {Card, List, Button} from 'antd';
import CommonLayout from '../../layouts/common';
class Home extends React.Component {
    render = () => {
        return (
            <CommonLayout auth={false} >
                <Card title="Welcome to Gym Tracking app">
                    <Link to="/login"><Button>Click here to Login</Button></Link>
                </Card>
            </CommonLayout>
        )
    }
};

export default Home;
