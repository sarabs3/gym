import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { List, Row, Col, Button, Icon, Card } from 'antd';
import TodayStatus from '../TodayStatus/TodayStatus.component';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import moment from 'moment';
import CommonLayout from '../../layouts/common';

const weeks = [
  { day: 'Mon', exercise: 'Rest', id: 0 },
  { day: 'Tues', exercise: 'Lower Body Pull', id: 2 },
  { day: 'Wed', exercise: 'Uper Body Push', id: 3 },
  { day: 'Thu', exercise: 'Rest', id: 0 },
  { day: 'Fri', exercise: 'Lower Body Push', id: 5 },
  { day: 'Sat', exercise: 'Uper Body Pull', id: 6 },
  { day: 'Sun', exercise: 'Metabolic Conditioning Workouts', id: 7, desc: 'Add these training methods popularised by CrossFit to break up the monotony of body part splits' },
  { day: 'any', exercise: 'Obliques', id: 4 }
];

// check timestamp is for Today
const todayStatus = (timestamp) => timestamp ? moment(timestamp).isBetween(moment().startOf('date'), moment().endOf('date')) : false;


class WeekDays extends React.Component {
  
  gymResponse = (gymStatus) => {
    this.props.firebase.push(`attandance/${this.props.uid}`, { date: moment().unix()*1000, status: gymStatus });
    this.props.history.push('/dashboard/attandance');
  };

  render = () => {
    const { data } = this.props;
    return (
      <CommonLayout>
        <div className="exercies">
          <Button onClick={this.props.history.goBack}>
              <Icon type="left" />
          </Button>
          <Row>
            <Col span={24}>
                <Card title={data.name} >
                  {data.exercises && data.exercises.map((item) => (
                    <div>
                      <p>{item.day}</p>
                      <p>{item.exerciseName}</p>
                      <p>{item.reps}</p>
                      <p>{item.sets}</p>
                    </div>
                  ))}
                </Card>
            </Col>
          </Row>
        </div>
      </CommonLayout>
    );
  }
}

const WeekSummary = (props) => (
  <Fragment>
    <WeekDays {...props} />
  </Fragment>
);

// Get data from the firebase
const enhancer = compose(
  firebaseConnect(
    props => (
      [
        {
          path: `plans/${props.match.params.id}`,
          storeAs: 'plansDetails',
        }
      ]
    )
  ),
  connect(
    ({ firebase }) => ({
      data: firebase.data.plansDetails,
      uid: firebase.auth.uid
    })
  )
);
// Attach the firebase data to the component.
const WeekSummaryEnhancer = enhancer(WeekSummary);

WeekSummary.defaultProps = {
  data: {
    name: '',
    exercises: [],
  },
};
// Container
export default connect(
  ({ firebase }) => ({
    uid: firebase.auth.uid
  })
)(WeekSummaryEnhancer);