import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { menustaff, menuAdmin } from './menuApp';
import './Header.scss';
import {
    BrowserRouter as Router,
    Link,
    Route
} from "react-router-dom";
import { withRouter } from 'react-router';

class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menuApp: []
        }
    }

    componentDidMount() {
        let { userInfo } = this.props;
        if (userInfo.data.roleId === 'R1') {
            this.setState({
                menuApp: menustaff
            })
        } else if (userInfo.data.roleId === 'R3') {
            this.setState({
                menuApp: menuAdmin
            })
        } else {
            this.setState({
                menuApp: []
            })
        }
    }

    handleBackHome = () => {
        if (this.props.history) {
            this.props.history.push('/home')
        }
    }

    render() {
        const { processLogout } = this.props;
        let { menuApp } = this.state;

        return (

            //     {/* thanh navigator */}
            <div className="header-container">
                <div className="header-tabs-container">
                    <Navigator menus={menuApp} />
                </div>
                {/* nút logout */}
                <div className='btn-logout' onClick={() => this.handleBackHome()}>
                    <i className="fas fa-sign-out-alt"></i>
                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
