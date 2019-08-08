import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {Layout} from 'antd';
import Navigation from '../components/menu';

const { Header, Content } = Layout;

const CommonLayout = ({ children, auth }) => (
    <Fragment>
        <Header>
            <Navigation auth={auth} />
        </Header>
        <Content>
            {children}
        </Content>
    </Fragment>
);
CommonLayout.propTypes = {
    auth: PropTypes.bool,
    children: PropTypes.node,
};
CommonLayout.defaultProps = {
    auth: false,
    children: null,
};

export default CommonLayout;
