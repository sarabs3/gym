import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { List, Typography, Row, Col, Button, Icon } from 'antd';
import { DateInList } from '../../components/dateInList';
import weeks from './exercises.json';
const exerciesName = {
    0: 'Lower Body Pull',
    1: 'Uper Body Push',
    2: 'Lower Body Push',
    3: 'Uper Body Pull',
    4: 'Metabolic Conditioning Workouts',
    5: 'Rest',
    6: 'Rest',
    7: 'Obliques',
};

const ExerciseList = ({ params = {}, ...props }) => (
    <div className="exercies">
        <Button onClick={props.history.goBack}>
            <Icon type="left" />
        </Button>
        <Row>
            <Col span={24}>
                <h4>{exerciesName[params.id]}</h4>
                <List
                    dataSource={weeks[params.id]}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={item.exercise}
                                description={item.set}
                            />
                        </List.Item>
                    )}
                />
            </Col>
        </Row>
    </div>
);

const Exercise = ({ match = {}, ...props }) => (
    <Fragment>
        <ExerciseList {...props} params={match.params} />
    </Fragment>
);

export default Exercise;
