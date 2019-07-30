import React from 'react';
import { Link } from 'react-router-dom';
import {Card, List, Button} from 'antd';
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import CommonLayout from '../../layouts/common';
class Workout extends React.Component {
    render = () => {
        console.log('asd', this.props.plans);
        return (
            <CommonLayout>
                <Card title="Workout" extra={<Button onClick={() => this.props.history.push('/workouts/add')}>Add Workout</Button>}>
                    <List
                        dataSource={this.props.exercises}
                        renderItem={({value, key}) => {
                            return (
                                // <Link to="/plans/1"> actions={[<a>Edit</a>, <a>Delete</a>]}
                                    <List.Item>
                                        <List.Item.Meta
                                            title={value.exercise}
                                        />
                                    </List.Item>
                                // </Link>
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