import React from 'react';
import { Link } from 'react-router-dom';
import {Card, Input, Select, List, Button, Row, Col} from 'antd';
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import CommonLayout from "../../layouts/common";
const { Option } = Select;
class AddWorkout extends React.Component {
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
    formSubmit = (e) => {
        e.preventDefault();
        this.props.firebase.push('/exercises', { exercise: this.state.formData.title })
        .then(() => this.props.history.push('/workouts'))
        .catch((err) => console.log('error', err));

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
                    <Card title="Add Workouts">
                        <form onSubmit={this.formSubmit}>
                            <div style={{ marginBottom: 16 }}>
                                <Input placeholder="Workout Name" type="text" name="title" value={formData.title} onChange={(e) => this.handleChange('title', e.target.value)} />
                            </div>
                            <Button onClick={this.formSubmit} type="submit">Submit</Button>
                            <Button onClick={() => this.props.history.push('/workouts')} type="button">Cancel</Button>
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
export default enhancer(AddWorkout)