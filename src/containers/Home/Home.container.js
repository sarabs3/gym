import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import {Card, List, Button} from 'antd';
import { isEmpty, withFirebase, isLoaded } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import CommonLayout from '../../layouts/common';
class Home extends React.Component {
    render = () => {
        const { auth } = this.props;
        if (isLoaded(auth)) {
            return isEmpty(auth) ? (
                <CommonLayout auth={false} >
                    <Card title="Welcome to Gym Tracking app">
                        <Link to="/login"><Button>Click here to Login</Button></Link>
                    </Card>
                </CommonLayout>
            ) : (
                <Redirect to="/dashboard" />
            )
        }
        return <p>Loading ...</p>
    }
};

export default compose(
    withFirebase,
    connect(({ firebase: { auth } }) => ({ auth })))(Home);
