import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Button } from 'antd';
import {Link} from 'react-router-dom'
import Media from "react-media";
class Navigation extends React.Component {
    render() {
        if (!this.props.auth) {
            return (
                <Menu
                    mode="horizontal"
                    theme="dark"
                    style={{lineHeight: '64px'}}
                    >
                        <Menu.Item><Button><Link to='/login'>Login</Link></Button></Menu.Item>
                </Menu>
            )
        }
        return (
            <React.Fragment>
                <Media query="(max-width: 900px)">
                {matcher => matcher ? (
                    <Menu
                    mode="horizontal"
                    theme="dark"
                    style={{lineHeight: '64px'}}
                    >
                        <Menu.Item><Link to='/dashboard'>Home</Link></Menu.Item>
                        <Menu.Item><Link to='/workouts'>Workouts</Link></Menu.Item>
                        <Menu.Item><Link to='/plans'>Plans</Link></Menu.Item>
                        <Menu.Item><Link to='/dashboard/attandance'>Attandance</Link></Menu.Item>
                        <Menu.Item><Button><Link to='/logout'>Logout</Link></Button></Menu.Item>
                    </Menu>
                ): (
                    <Menu
                        mode="horizontal"
                        theme="dark"
                        style={{lineHeight: '64px'}}
                    >
                        <Menu.Item><Link to='/dashboard'>Home</Link></Menu.Item>
                        <Menu.Item><Link to='/workouts'>Workouts</Link></Menu.Item>
                        <Menu.Item><Link to='/plans'>Plans</Link></Menu.Item>
                        <Menu.Item><Link to='/dashboard/attandance'>Attandance</Link></Menu.Item>
                        <Menu.Item><Button><Link to='/logout'>Logout</Link></Button></Menu.Item>
                    </Menu>
                    )}
                </Media>
            </React.Fragment>
        )
    }
}
Navigation.propTypes = {
    auth: PropTypes.bool,
};
Navigation.defaultProps = {
    auth: true,
};
export default Navigation;