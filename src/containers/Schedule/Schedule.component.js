import React from 'react';
import { List, Icon, Card } from 'antd';
import moment from 'moment';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

class Schedule extends React.Component {
    state = {
        startOfWeek: moment().startOf('week').unix() * 1000,
        endOfWeek: moment().endOf('week').unix() * 1000,
    }
    render = () => {
        if (!this.props.data) {
            return <p>Loading...</p>
        }
        const { startOfWeek, endOfWeek } = this.state;
        return (
            <Card title="This week's plan">
                <List
                    dataSource={this.props.data}
                    renderItem={(item) => {
                        const { date, status } = item.value;
                        return (
                        <List.Item>
                            <List.Item.Meta
                                title={moment(date).format('MM-DD-YYYY')}
                                description={status ? <Icon type="check" /> : <Icon type="close" />}
                            />
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
const ScheduleEnhancer = enhancer(Schedule);


// Container
export default connect(
    ({ firebase }) => ({
        uid: firebase.auth.uid
    })
)(ScheduleEnhancer);