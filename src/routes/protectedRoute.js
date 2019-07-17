import React from 'react';
import { Layout } from 'antd';
import { Route, Redirect, Switch } from 'react-router-dom';
import Navigation from '../components/menu';
import { firebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import LoaderComponent from '../components/loader';
import Wrapper from '../components/wrapper';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ErrorBoundary from '../components/errorBoundry';
import '../pageAnimations.css';


import { Gym } from '../containers/gym';
import { Exercise } from '../containers/Exercise';
import Schedule from '../containers/Schedule/Schedule.component';
import ExerciseInput from '../containers/Exercise/ExerciseInput.component';

const { Header, Content } = Layout;


const PrivateRouteComponent = props => (
    isLoaded(props.auth) ? (
        !isEmpty(props.auth) ? (
            <ErrorBoundary>
                <Layout>
                    <Header>
                    <Navigation />
                    </Header>
                    <Content>
                        <TransitionGroup>
                            <CSSTransition
                                key={props.location.key}
                                timeout={300}
                                classNames='page-transition'
                            >
                                <Wrapper>
                                    <Switch location={props.location}>
                                        <Route path="/dashboard/attandance/:id" component={ExerciseInput} />
                                        <Route path="/dashboard/attandance" component={Schedule} />
                                        <Route path="/dashboard/:id" component={Exercise}  />
                                        <Route path="/" component={Gym}  />
                                    </Switch>
                                </Wrapper>
                            </CSSTransition>
                        </TransitionGroup>
                    </Content>
                </Layout>
            </ErrorBoundary>
        ) : <Redirect to="/" />
    ) : <Wrapper><LoaderComponent /></Wrapper>
);

export default compose(
    firebaseConnect(),
    connect(({ firebase: { auth } }) => ({ auth })),
)(PrivateRouteComponent);
