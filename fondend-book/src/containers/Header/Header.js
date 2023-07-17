import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, menuAdmin } from './menuApp';
import './Header.scss';
import {
    BrowserRouter as Router,
    Link,
    Route
} from "react-router-dom";

class Header extends Component {

    render() {
        const { processLogout } = this.props;

        return (

            //     {/* thanh navigator */}
            <div className="header-container">
                <div className="header-tabs-container">
                    <Navigator menus={menuAdmin} />
                </div>
                {/* nút logout */}
                <div className='btn-logout' onClick={processLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
