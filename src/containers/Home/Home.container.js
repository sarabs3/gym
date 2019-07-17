import React from 'react';
import { Link } from 'react-router-dom';
import {Card, List} from 'antd';
class Home extends React.Component {
    render = () => {
        return (
            <Card title="Workout Plans">
                <List
                    dataSource={[{ title: "Plan 1" }]}
                    renderItem={(item) => {
                        return (
                            <Link to="/plans/1">
                                <List.Item>
                                    <List.Item.Meta
                                        title={item.title}
                                    />
                                </List.Item>
                            </Link>
                    )}}
                />
            </Card>
        )
    }
};

export default Home;
