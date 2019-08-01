import React from 'react';
import { Link } from 'react-router-dom';
import {Card, List, Button} from 'antd';
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import CommonLayout from '../../layouts/common';

class Plans extends React.Component {
    render = () => {
        console.log('asd', this.props.plans);
        return (
            <CommonLayout>
                <Card title="Workout Plans" extra={<Button onClick={() => this.props.history.push('/plans/add')}>Add Plans</Button>}>
                    <List
                        dataSource={this.props.plans}
                        renderItem={({value, key}) => {
                            return (
                                <Link to={`/plans/${key}`}>
                                    <List.Item actions={[<a>Edit</a>, <a>Delete</a>]}>
                                        <List.Item.Meta
                                            title={value.name}
                                        />
                                    </List.Item>
                                </Link>
                        )}}
                    />
                </Card>
            </CommonLayout>
        )
    }
};

// Get data from the firebase
const enhancer = compose(
    firebaseConnect(
        () => (
            [
                {
                    path: `plans/`,
                    storeAs: 'plans',
                    queryParams: []
                }
            ]
        )
    ),
    connect(
        ({ firebase }) => ({
            plans: firebase.ordered.plans,
            uid: firebase.auth.uid
        })
    )
);


// Container
export default enhancer(Plans)