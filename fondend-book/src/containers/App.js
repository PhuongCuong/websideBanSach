import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';


import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'

import Home from '../routes/Home';
import login from '../containers/login/Login'
import System from '../routes/System';

import { CustomToastCloseButton } from '../components/CustomToast';
import ConfirmModal from '../components/ConfirmModal';
import '../../node_modules/react-toastify/dist/ReactToastify.css';
import Header from './Header/Header';
import HomePage from './Client/Home/HomePage';
import Scrollbars from 'react-custom-scrollbars';
import BookDetail from './Client/Product/BookDetail';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-markdown-editor-lite/lib/index.css';
import Cart from './Client/Cart/Cart';
import CartBill from './Client/Cart/CartBill';
import "react-multi-carousel/lib/styles.css";
import ShowBook from './Client/Product/ShowBook';
import HomeAfterSearch from './Client/Header/HomeAfterSearch';
import Infouser from './Client/Header/Infouser';
import ListBill from './Client/Cart/ListBill';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <ConfirmModal />
                        {/* {this.props.isLoggedIn && <Header />} */}

                        <span className="content-container">
                            <Scrollbars className='scrollbars' style={{ width: '100%', height: '100vh' }}>
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.HOMEPAGE} exact component={(HomePage)} />
                                    <Route path={path.BOOK} exact component={(BookDetail)} />
                                    <Route path={path.CART} exact component={(Cart)} />
                                    <Route path={path.CART_BILL} exact component={(CartBill)} />
                                    <Route path={path.SHOW_BOOK} exact component={(ShowBook)} />
                                    <Route path={path.SHOW_BOOK} exact component={(ShowBook)} />
                                    <Route path={path.HOME_SEARCH} exact component={(HomeAfterSearch)} />
                                    <Route path={path.INFOUSER} exact component={(Infouser)} />
                                    <Route path={path.LISTBILL} exact component={(ListBill)} />

                                </Switch>
                            </Scrollbars >

                        </span>

                        {/* <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}

                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                        {/* Same as */}
                        <ToastContainer />
                    </div>
                </Router>


            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);