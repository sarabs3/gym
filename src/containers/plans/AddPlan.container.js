import React from 'react';
import { Link } from 'react-router-dom';
import {Card, Input, Select, List, Button, Row, Col} from 'antd';
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import CommonLayout from "../../layouts/common";
const { Option } = Select;
class AddPlan extends React.Component {
    state = {
        title: '',
        formData: {
            title: '',
            desc: '',
            day: [],
            active: false,
        },
        monday: {
            exercise: 1,
        },
        tuesday: {
            exercise: 1,
        },
        options: [{
            id: 1,
            day: 'Sunday',
            active: true,
        },{
            id: 2,
            day: 'Monday',
            active: true,
        },{
            id: 3,
            day: 'Tuesday',
            active: true,
        },{
            id: 4,
            day: 'Thursday',
            active: true,
        }],
        todo:[],
        
    }
    handleChange = (key, value) => {
        this.setState({ [key]: value });
    }
    formSubmit = () => {
        const payload = {
            name: this.state.title,
            exercises: [
                {
                    ...this.state.monday,
                    day: 'Monday',
                    exerciseName: this.props.exercises.find((ex) => ex.key === this.state.monday.exercise ).value.exercise,
                },
                {
                    ...this.state.tuesday,
                    day: 'Tuesday',
                    exerciseName: this.props.exercises.find((ex) => ex.key === this.state.tuesday.exercise ).value.exercise,
                }
            ],
        };
        console.log('xyz', payload);
        this.props.firebase.push('/plans', payload);
        return;
        this.props.addWorkout({title: this.state.formData.title, desc: this.state.formData.desc, day: this.state.formData.day});

    }
    handleDays = (value) => {
        const { formData: { day } } = this.state;
        // updated the selected option in formData
        let { options } = this.state;
        day.push(value);
        // Find the selected option
        const selectedOption = options.find((opt) => opt.id == value);
        // Set selected option to false so it will not show in the dropdown
        selectedOption.active = false;
        // re assign the updated array
        options = [ ...options, selectedOption ];
        this.setState((state) => ({ formData: { ...state.formData, day }, options }));
    }
    render = () => {
        const { formData , options, monday, tuesday} = this.state;
        const { exercises = [] } = this.props;
        return (
            <CommonLayout>
                <div className="App">
                <Row>
                    <Col span={24}>
                    <Card title="Add Plan">
                        <form onSubmit={this.formSubmit}>
                            <div style={{ marginBottom: 16 }}>
                                <Input placeholder="Plan Name" type="text" name="title" value={formData.title} onChange={(e) => this.handleChange('title', e.target.value)} />
                            </div>
                            <Card title="Monday">
                                <div style={{ marginBottom: 16 }}>
                                    <Card title="Exercise 1">
                                        <div style={{ marginBottom: 16 }}>
                                            <Select defaultValue={monday.exercise} onChange={(e) => this.setState((state) => ({ monday: { ...state.monday, exercise: e } }))}>
                                                {exercises.map(({key, value}) => (
                                                    <Option value={key}>{value.exercise}</Option>
                                                ))}
                                                <Option value={2}>Push Ups</Option>
                                            </Select>
                                        </div>
                                        <div style={{ marginBottom: 16 }}>
                                            <Input value={monday.set} onChange={({target: {value}}) => this.setState((state) => ({ monday: { ...state.monday, set: value } }))} placeholder="Sets" />
                                        </div>
                                        <div style={{ marginBottom: 16 }}>
                                            <Input value={monday.reps} onChange={({target: {value}}) => this.setState((state) => ({ monday: { ...state.monday, reps: value } }))} value={monday.reps} placeholder="Reps" />
                                        </div>
                                    </Card>
                                </div>
                            </Card>
                            <Card title="Tuesday">
                                <div style={{ marginBottom: 16 }}>
                                    <Card title="Exercise 1">
                                    <div style={{ marginBottom: 16 }}>
                                            <Select defaultValue={tuesday.exercise} onChange={(e) => this.setState((state) => ({ tuesday: { ...state.tuesday, exercise: e } }))}>
                                                {exercises.map(({key, value}) => (
                                                    <Option value={key}>{value.exercise}</Option>
                                                ))}
                                                <Option value={2}>Push Ups</Option>
                                            </Select>
                                        </div>
                                        <div style={{ marginBottom: 16 }}>
                                            <Input value={tuesday.set} onChange={({target: {value}}) => this.setState((state) => ({ tuesday: { ...state.tuesday, set: value } }))} placeholder="Sets" />
                                        </div>
                                        <div style={{ marginBottom: 16 }}>
                                            <Input value={tuesday.reps} onChange={({target: {value}}) => this.setState((state) => ({ tuesday: { ...state.tuesday, reps: value } }))} value={tuesday.reps} placeholder="Reps" />
                                        </div>
                                    </Card>
                                </div>
                            </Card>
                            <div style={{ marginBottom: 16 }}>
                                <Button type="primary" block>Add Exercise</Button>
                            </div>
                            <Button onClick={this.formSubmit} type="submit">Submit</Button>
                            <Button onClick={() => this.props.history.push('/plans')} type="button">Cancel</Button>
                        </form>
                        </Card>
                    </Col>
                    </Row>
                </div>
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
                },
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
            plans: firebase.ordered.plans,
            exercises: firebase.ordered.exercises,
            uid: firebase.auth.uid
        })
    )
);


AddPlan.defaultProps = {
    exercises: [],
};
// Container
export default enhancer(AddPlan)