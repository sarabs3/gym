import React from 'react';
import { List, Icon, Card, Select } from 'antd';
import moment from 'moment';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import weeks from './exercises.json';
const { Option } = Select;
const exerciesName = [{
    id: 2, exercise: 'Lower Body Pull'},
    {id: 3, exercise: 'Uper Body Push'},
    {id: 5, exercise: 'Lower Body Push'},
    {id: 6, exercise: 'Uper Body Pull'},
    {id: 7, exercise: 'Metabolic Conditioning Workouts'},
    {id: 0, exercise: 'Rest'},
    {id: 4, exercise: 'Obliques'},
];

class ExerciseInput extends React.Component {
    state = {
        selectedExercise: 2,
    }
    handleSelect = (e) => {console.log(e); this.setState({ selectedExercise: e })}
    render = () => {
        const { match = {} } = this.props;
        const selectedEx = exerciesName.find((ex) => ex.id === this.state.selectedExercise);
        return (
            <div>
                <Card>
                <Select defaultValue={this.state.selectedExercise} onSelect={this.handleSelect}>
                {exerciesName.map((exercise) => <Option value={exercise.id} >{exercise.exercise}</Option>)}
            </Select></Card>

            <Card title={selectedEx.exercise}>
                <List
                    dataSource={weeks[this.state.selectedExercise]}
                    renderItem={(item) => {
                        const setsArray = new Array(item.sets).fill(item.sets);
                        return (
                        <List.Item>
                            <div className="addData">
                            <h2>{item.exercise}</h2>
                            <h3>{item.set}</h3>
                            <div style={{ display: 'flex', }}>
                                
                                {setsArray.map((set, index) =>
                                <div className="inputExerciseData">
                                <h5>Rep {index + 1}</h5>
                                <div className="input">
                                    <input type="number" step="5" placeholder="Weight" inputmode="numeric" pattern="[0-9]*" />
                                </div>
                                    <label>lbs</label>
                                </div>
                                )}
                            </div>
                            </div>
                        </List.Item>
                    )}}
                />
            </Card>
            </div>
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
// export default connect(
//     ({ firebase }) => ({
//         uid: firebase.auth.uid
//     })
// )(ExerciseInputEnhancer);

export default ExerciseInput;
