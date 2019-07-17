import React from 'react';
import { List, Icon, Card } from 'antd';
import moment from 'moment';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import weeks from './exercises.json';
const exerciesName = {
    0: 'Lower Body Pull',
    1: 'Uper Body Push',
    2: 'Lower Body Push',
    3: 'Uper Body Pull',
    4: 'Metabolic Conditioning Workouts',
    5: 'Rest',
    6: 'Rest',
    7: 'Obliques',
};

class ExerciseInput extends React.Component {
    render = () => {
        if (!this.props.data) {
            return <p>Loading...</p>
        }
        const { match = {} } = this.props;
        console.log('asd', match, exerciesName[match.params.id]);
        return (
            <Card title={exerciesName[match.params.id]}>
                <List
                    dataSource={weeks[match.params.id]}
                    renderItem={(item) => {
                        const setsArray = new Array(item.sets).fill(item.sets);
                        return (
                        <List.Item>
                            <List.Item.Meta
                                title={item.exercise}
                                description={item.set}
                            />
                            <div>
                                {setsArray.map((set) => <input type="text" placeholder="Weight" />)}
                            </div>
                        </List.Item>
                    )}}
                />
            </Card>
        )
    }
}

// Get data from the firebase
const enhancer = compose(
    firebaseConnect(
        props => (
            [
                {
                    path: `attandance/${props.uid}`,
                    storeAs: 'attandance',
                    queryParams: ['orderByChild=date']
                }
            ]
        )
    ),
    connect(
        ({ firebase }) => ({
            data: firebase.ordered.attandance,
            uid: firebase.auth.uid
        })
    )
);
// Attach the firebase data to the component.
const ExerciseInputEnhancer = enhancer(ExerciseInput);


// Container
export default connect(
    ({ firebase }) => ({
        uid: firebase.auth.uid
    })
)(ExerciseInputEnhancer);