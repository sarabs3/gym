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
        this.setState((state) => ({ formData: { ...state.formData, [key]: value } }));
    }
    formSubmit = () => {
        console.log('xyz')
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
        const { formData , options} = this.state;
        return (
            <CommonLayout>
                <div className="App">
                <Row>
                    <Col span={12}>
                    <Card title="Add Plan">
                        <form onSubmit={this.formSubmit}>
                            <div style={{ marginBottom: 16 }}>
                                <Input placeholder="Plan Name" type="text" name="title" value={formData.title} onChange={(e) => this.handleChange('title', e.target.value)} />
                            </div>
                            <div style={{ marginBottom: 16 }}>
                                <Input placeholder="Day" type="text" name="day" value={formData.title} onChange={(e) => this.handleChange('day', e.target.value)} />
                            </div>
                            <div style={{ marginBottom: 16 }}>
                                <Card title="Exercise 1">
                                    <div style={{ marginBottom: 16 }}>
                                        <Select defaultValue={1}>
                                            <Option value={1}>Planks</Option>
                                            <Option value={2}>Push Ups</Option>
                                        </Select>
                                    </div>
                                    <div style={{ marginBottom: 16 }}>
                                        <Input placeholder="Sets" />
                                    </div>
                                    <div style={{ marginBottom: 16 }}>
                                        <Input placeholder="Reps" />
                                    </div>
                                </Card>
                            </div>
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
export default enhancer(AddPlan)