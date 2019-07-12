import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { DateInList } from '../../components/dateInList';
import { List, Row, Col, Anchor  } from 'antd';


const weeks = [
    { day: 'Mon', exercise: 'Rest', id: 5 },
    { day: 'Tues', exercise: 'Lower Body Pull', id: 0 },
    { day: 'Wed', exercise: 'Uper Body Push', id: 1 },
    { day: 'Thu', exercise: 'Rest', id: 6 },
    { day: 'Fri', exercise: 'Lower Body Push', id: 2 },
    { day: 'Sat', exercise: 'Uper Body Pull', id: 3 },
    { day: 'Sun', exercise: 'Metabolic Conditioning Workouts', id: 4, desc: 'Add these training methods popularised by CrossFit to break up the monotony of body part splits' },
    {day: 'any', exercise: 'Obliques', id: 7}
];

const WeekDays = () => (
    <div className="exercies">
        <Row>
            <Col span={24}>
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
            </Col>
        </Row>
    </div>
);

const WeekSummary = () => (
    <Fragment>
        <WeekDays />
    </Fragment>
);

export default WeekSummary;
