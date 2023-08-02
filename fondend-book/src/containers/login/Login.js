import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';

import { handleLogin, handletest, handleNewUser } from '../../services/userService';
import { toast } from 'react-toastify';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true,
            email: '',
            password: '',
            name: '',
            errMessager: '',
            cName: '',
            cEmail: '',
            cPassword: '',
            cPasswordxn: '',
            isShowPass: false,
            isShowPassSingup: false,
            isShowPassSingupcomfimg: false,
            isShowLogin: false
        }
    }

    async componentDidMount() {
    }

    handleChangeLogin = () => {
        this.setState({
            isLogin: !this.state.isLogin
        })
    }

    hanleOnClickSingin = async () => {
        try {
            let { errMessager } = this.state;
            let data = await handleLogin(this.state.email, this.state.password);
            if (data) {
                alert(data.errMessanger)
                if (data.errCode === 0) {
                    this.props.userLoginSuccess(data)
                }
            }
        } catch (e) {
            console.log(e)
        }

    }

    handleOnChangeInput = (event, id) => {
        let statecopy = { ...this.state };
        statecopy[id] = event.target.value;
        this.setState({
            ...statecopy
        })

    }

    handleShowPassword = (id) => {
        if (id === 'password') {
            this.setState((prevState) => ({
                isShowPass: !prevState.isShowPass
            }));
        } else if (id === 'cPassword') {
            this.setState((prevState) => ({
                isShowPassSingup: !prevState.isShowPassSingup
            }));
        } else if (id === 'cPasswordxn') {
            this.setState((prevState) => ({
                isShowPassSingupcomfimg: !prevState.isShowPassSingupcomfimg
            }));
        }
    }

    handleCheckInput = () => {
        let isvalude = true;
        let arr = ['cName', 'cEmail', 'cPassword', 'cPasswordxn'];
        for (let i = 0; i < arr.length; i++) {
            if (!this.state[arr[i]]) {
                isvalude = false;
                alert(`missing parameter:`);
                break;
            }
        }
        return isvalude;
    }

    handleOnsingup = async () => {
        let { cName, cEmail, cPassword } = this.state;
        let isValid = this.handleCheckInput();
        if (isValid === true) {
            if (this.state.cPasswordxn === this.state.cPassword) {
                let data = await handleNewUser({
                    name: cName,
                    email: cEmail,
                    password: cPassword
                });
                if (data && data.errCode === 0) {
                    toast.success('🦄 Create new user success!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });

                    this.setState({
                        cEmail: '',
                        cName: '',
                        cPassword: '',
                        cPasswordxn: ''
                    })
                } else {
                    alert(data.errMessanger)

                }


            }
            else {
                alert('Password xác nhận chưa đúng')
            }
        }
    }

    handleShowlogin = () => {
        this.setState({
            isShowLogin: !this.state.isShowLogin
        })
    }

    render() {
        let { isLogin, errMessager, isShowPass, isShowLogin, isShowPassSingup, isShowPassSingupcomfimg } = this.state;
        return (
            <div className='login-wrapper'>
                <div className='login-container'>
                    <div className='login-title'>

                    </div>
                    <div className='login-form'>
                        <div className='login-form-left'>
                            {isShowLogin === false ?
                                <div className='login-form-DN'>
                                    <div className='login-form-DN-title'>
                                        <h4>Đăng nhập</h4>
                                    </div>
                                    <div className='login-form-input row'>
                                        <div className='col-12'>
                                            <label>Email</label>
                                            <input type='email' className='form-control'
                                                value={this.state.email}
                                                onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                            />
                                        </div>
                                        <div className='col-12'>
                                            <label>Password</label>
                                            <div className='input-password'>
                                                <input type={isShowPass === false ? 'password' : 'text'} className='form-control'
                                                    value={this.state.password}
                                                    onChange={(event) => this.handleOnChangeInput(event, 'password')}
                                                />
                                                <i className={isShowPass === false ? "fas fa-eye-slash" : "fas fa-eye"}
                                                    onClick={() => this.handleShowPassword('password')}
                                                ></i>
                                            </div>
                                        </div>

                                        <div className='col-12'>
                                            <button className='btn-dangNhap'
                                                onClick={() => this.hanleOnClickSingin()}
                                            >Đăng nhập</button>
                                        </div>
                                        <div className='text-dangky col-12'
                                        >
                                            <span
                                                onClick={() => this.handleShowlogin()}
                                            >Tạo tài khoản?</span>
                                        </div>
                                        <div className='text-login-orther col-12'>
                                            <p>
                                                <span>Hoặc tiếp tục bằng</span>
                                            </p>
                                        </div>
                                        <div className='orther-login col-12'>
                                            <div className='logo-login-fab'></div>
                                            <div className='logo-login-goo'></div>

                                        </div>
                                    </div>
                                </div>
                                :
                                <div className='login-form-DK'>
                                    <div className='login-form-DN-title'>
                                        <h4>Đăng ký</h4>
                                    </div>
                                    <div className='login-form-input row'>
                                        <div className='col-12'>
                                            <label>Họ và tên</label>
                                            <input type='email' className='form-control'
                                                value={this.state.cName}
                                                onChange={(event) => this.handleOnChangeInput(event, 'cName')}
                                            />
                                        </div>
                                        <div className='col-12'>
                                            <label>Email</label>
                                            <input type='email' className='form-control'
                                                value={this.state.cEmail}
                                                onChange={(event) => this.handleOnChangeInput(event, 'cEmail')}
                                            />
                                        </div>
                                        <div className='col-12'>
                                            <label>Password</label>
                                            <div className='input-password'>
                                                <input type={isShowPassSingup === false ? 'password' : 'text'} className='form-control'
                                                    value={this.state.cPassword}
                                                    onChange={(event) => this.handleOnChangeInput(event, 'cPassword')}
                                                />
                                                <i className={isShowPassSingup === false ? "fas fa-eye-slash" : "fas fa-eye"}
                                                    onClick={() => this.handleShowPassword('cPassword')}
                                                ></i>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <label>Xác nhận Password</label>
                                            <div className='input-password'>
                                                <input type={isShowPassSingupcomfimg === false ? 'password' : 'text'} className='form-control'
                                                    value={this.state.cPasswordxn}
                                                    onChange={(event) => this.handleOnChangeInput(event, 'cPasswordxn')}
                                                />
                                                <i className={isShowPassSingupcomfimg === false ? "fas fa-eye-slash" : "fas fa-eye"}
                                                    onClick={() => this.handleShowPassword('cPasswordxn')}
                                                ></i>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <button className='btn-dangNhap'
                                                onClick={() => this.handleOnsingup()}
                                            >Đăng Ký</button>
                                        </div>
                                        <div className='col-12'>
                                            <button className='btn-Backlogin'
                                                onClick={() => this.handleShowlogin()}
                                            >Trở lại Đăng Nhập</button>
                                        </div>
                                    </div>
                                </div>
                            }

                        </div>
                        <div className='login-form-right'>
                            <div className='login-form-logo'></div>
                            <div className='login-form-text-right'>
                                <h4>Mua sắm tại Tiki</h4>
                                <span>Siêu ưu đãi mỗi ngày</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        )
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
        // navigate: (path) => dispatch(push(path)),
        // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        // adminLoginFail: () => dispatch(actions.adminLoginFail()),

        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
