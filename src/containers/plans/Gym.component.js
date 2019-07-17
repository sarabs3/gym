import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { List, Row, Col, Button, Icon } from 'antd';
import TodayStatus from '../TodayStatus/TodayStatus.component';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import moment from 'moment';

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
    let status = false;
    if (this.props.data) {
      status = todayStatus(this.props.data[0].value.date);
    }
    return (
      <div className="exercies">
        <Button onClick={this.props.history.goBack}>
            <Icon type="left" />
        </Button>
        <Row>
          <Col span={24}>
              <List
                dataSource={weeks}
                renderItem={item => (
                  <Link to={`/plans/details/${item.id}`}>
                    <List.Item>
                      <List.Item.Meta
                        title={item.exercise}
                        description={item.day}
                      />
                    </List.Item>
                  </Link>
                )}
              />
          </Col>
        </Row>
      </div>
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
          path: `attandance/${props.uid}`,
          storeAs: 'attandance',
          queryParams: ['limitToLast=1']
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
const WeekSummaryEnhancer = enhancer(WeekSummary);


// Container
export default connect(
  ({ firebase }) => ({
    uid: firebase.auth.uid
  })
)(WeekSummaryEnhancer);