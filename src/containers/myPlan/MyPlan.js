import React from 'react';
import { Card } from 'antd';

class MyPlan extends React.Component {
    render = () => {
        const { children } = this.props;
        return (
            <Card title="My Plan">{children}</Card>
        );
    }
};


export default MyPlan;
