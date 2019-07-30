import React, { Fragment } from 'react';
import {Layout} from 'antd';
import Navigation from '../components/menu';

const { Header, Content } = Layout;

export default ({ children }) => (
    <Fragment>
        <Header>
            <Navigation />
        </Header>
        <Content>
            {children}
        </Content>
    </Fragment>
);
