import React from 'react';
import { Link } from 'react-router-dom';
import {Card, List, Button} from 'antd';
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
class Workout extends React.Component {
    render = () => {
        console.log('asd', this.props.plans);
        return (
            <Card title="Workout Plans" extra={<Button onClick={() => this.props.history.push('/plans/add')}>Add Plans</Button>}>
                <List
                    dataSource={this.props.exercises}
                    renderItem={({value, key}) => {
                        return (
                            <Link to="/plans/1">
                                <List.Item actions={[<a>Edit</a>, <a>Delete</a>]}>
                                    <List.Item.Meta
                                        title={value.exercise}
                                    />
                                </List.Item>
                            </Link>
                    )}}
                />
            </Card>
        )
    }
};

// Get data from the firebase
const enhancer = compose(
    firebaseConnect(
        () => (
            [
                {
                    path: `exercises/`,
                    storeAs: 'exercises',
                    queryParams: []
                }
            ]
        )
    ),
    connect(
        ({ firebase }) => ({
            exercises: firebase.ordered.exercises,
            uid: firebase.auth.uid
        })
    )
);


// Container
export default enhancer(Workout)