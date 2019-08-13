import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { List, Row, Col } from 'antd';
import TodayStatus from '../TodayStatus/TodayStatus.component';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import moment from 'moment';
import { MyPlan } from "../myPlan";

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


class Home extends React.Component {
  state = {
    skip: false,
    today: moment().day(),
  };
  
  gymResponse = (gymStatus) => {
    // this.props.firebase.push(`attandance/${this.props.uid}`, { date: moment().unix()*1000, status: gymStatus });
    this.props.history.push(`/dashboard/attandance/`);
  };
  skip = () => {
    this.setState({ skip: true });
  }

  render = () => {
    let status = false;
    if (this.props.data) {
      status = todayStatus(this.props.data[0].value.date);
    }
    const { skip } = this.state;
    return (
      <div className="exercies">
        <Row>
          <Col span={24}>
            {!status && !skip ? (<TodayStatus skip={this.skip} gymResponse={this.gymResponse} />
            ) : (
              <Fragment>
                {!skip && <p className="notification">You already updated Today's status!</p>}
                <Link to='/dashboard/attandance'>Check Attandance</Link>
                <MyPlan>
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

                </MyPlan>
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
    <Home {...props} />
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
        },
        {
          path: `myplans/${props.uid}`,
          storeAs: 'myplans',
        }
      ]
    )
  ),
  connect(
    ({ firebase }) => ({
      data: firebase.ordered.attandance,
      myplans: firebase.ordered.myplans,
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