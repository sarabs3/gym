import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { List, Row, Col } from 'antd';
import TodayStatus from '../TodayStatus/TodayStatus.component';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import moment from 'moment';

const weeks = [
  { day: 'Mon', exercise: 'Rest', id: 5 },
  { day: 'Tues', exercise: 'Lower Body Pull', id: 0 },
  { day: 'Wed', exercise: 'Uper Body Push', id: 1 },
  { day: 'Thu', exercise: 'Rest', id: 6 },
  { day: 'Fri', exercise: 'Lower Body Push', id: 2 },
  { day: 'Sat', exercise: 'Uper Body Pull', id: 3 },
  { day: 'Sun', exercise: 'Metabolic Conditioning Workouts', id: 4, desc: 'Add these training methods popularised by CrossFit to break up the monotony of body part splits' },
  { day: 'any', exercise: 'Obliques', id: 7 }
];

// check timestamp is for Today
const todayStatus = (timestamp) => timestamp ? moment(timestamp).isBetween(moment().startOf('date'), moment().endOf('date')) : false;


class WeekDays extends React.Component {
  
  gymResponse = (gymStatus) => {
    this.props.firebase.push(`attandance/${this.props.uid}`, { date: moment().unix()*1000, status: gymStatus });
    this.props.history.push('/dashboard/attandance');
  };

  render = () => {
    if (!this.props.data) {
      return <p>Loading...</p>
    }
    const status = todayStatus(this.props.data[0].value.date);
    return (
      <div className="exercies">
        <Row>
          <Col span={24}>
            {!status ? (<TodayStatus gymResponse={this.gymResponse} />
            ) : (
              <Fragment>
                <p className="notification">You already updated Today's status!</p>
                <Link to='/dashboard/attandance'>Check Attandance</Link>
                <List
                  dataSource={weeks}
                  renderItem={item => (
                    <Link to={`dashboard/${item.id}`}>
                      <List.Item>
                        <List.Item.Meta
                          title={item.exercise}
                          description={item.day}
                        />
                      </List.Item>
                    </Link>
                  )}
                />
                </Fragment>
              )}
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