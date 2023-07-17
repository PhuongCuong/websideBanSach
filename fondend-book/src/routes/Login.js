// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { push } from "connected-react-router";

// import * as actions from "../store/actions";
// import { KeyCodeUtils, LanguageUtils } from "../utils";

// import './Login.scss';
// import { FormattedMessage } from 'react-intl';

// import adminService from '../services/adminService';
// import { handleLogin, handletest, handleNewUser } from '../services/userService';
// import { toast } from 'react-toastify';


// class Login extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isLogin: true,
//             email: '',
//             password: '',
//             name: '',
//             errMessager: '',
//             cName: '',
//             cEmail: '',
//             cPassword: '',
//             isShowPass: false,
//         }
//     }

//     async componentDidMount() {
//     }

//     handleChangeLogin = () => {
//         this.setState({
//             isLogin: !this.state.isLogin
//         })
//     }

//     hanleOnClickSingin = async () => {
//         try {
//             let { errMessager } = this.state;
//             let data = await handleLogin(this.state.email, this.state.password);
//             if (data) {
//                 this.setState({
//                     errMessager: data.errMessanger
//                 })
//                 if (data.errCode === 0) {
//                     this.props.userLoginSuccess(data)
//                 }
//                 console.log('this state', data)
//             }
//         } catch (e) {
//             console.log(e)
//         }

//     }

//     handleOnChangeInput = (event, id) => {
//         let statecopy = { ...this.state };
//         statecopy[id] = event.target.value;
//         this.setState({
//             ...statecopy
//         })

//     }

//     handleShowPassword = () => {
//         this.setState({
//             isShowPass: !this.state.isShowPass
//         })
//     }

//     handleCheckInput = () => {
//         let isvalude = true;
//         let arr = ['cName', 'cEmail', 'cPassword'];
//         for (let i = 0; i < arr.length; i++) {
//             if (!this.state[arr[i]]) {
//                 isvalude = false;
//                 alert(`missing parameter:`);
//                 break;
//             }
//         }
//         return isvalude;
//     }

//     handleOnsingup = async () => {
//         let { cName, cEmail, cPassword } = this.state;
//         let isValid = this.handleCheckInput();
//         if (isValid === true) {
//             let data = await handleNewUser({
//                 name: cName,
//                 email: cEmail,
//                 password: cPassword
//             });
//             console.log(data, cName, cEmail, cPassword)
//             if (data && data.errCode === 0) {
//                 toast.success('🦄 Create new user success!', {
//                     position: "top-right",
//                     autoClose: 5000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "light",
//                 });

//                 this.setState({
//                     cEmail: '',
//                     cName: '',
//                     cPassword: ''
//                 })

//             }
//             else {
//                 toast.error('🦄 Create new user error!', {
//                     position: "top-right",
//                     autoClose: 5000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "light",
//                 });

//             }
//         }
//         // if (!cName || !cEmail || !cPassword) {
//         //     toast.error('🦄 Create new user error!', {
//         //         position: "top-right",
//         //         autoClose: 5000,
//         //         hideProgressBar: false,
//         //         closeOnClick: true,
//         //         pauseOnHover: true,
//         //         draggable: true,
//         //         progress: undefined,
//         //         theme: "light",
//         //     });
//         // }

//         // else {

//         // }
//     }

//     render() {
//         let { isLogin, errMessager, isShowPass } = this.state;
//         console.log('check props', this.props.isLoggedIn)
//         return (
//             // <div className="login-wrapper">
//             //     <div className="login-container">
//             //         <div className="form_login">
//             //             <h2 className="title">
//             //                 <FormattedMessage id="login.login" />
//             //             </h2>
//             //             <div className="form-group icon-true">
//             //                 <img className="icon" src={userIcon} alt="this" />
//             //                 <input
//             //                     placeholder={LanguageUtils.getMessageByKey("login.username", lang)}
//             //                     id="username"
//             //                     name="username"
//             //                     type="text"
//             //                     className="form-control"
//             //                     value={username}
//             //                     onChange={this.onUsernameChange}
//             //                 />
//             //             </div>

//             //             <div id="phone-input-container" className="form-group icon-true">
//             //                 <img className="icon" src={passIcon} alt="this" />
//             //                 <input
//             //                     placeholder={LanguageUtils.getMessageByKey("login.password", lang)}
//             //                     id="password"
//             //                     name="password"
//             //                     type="password"
//             //                     className="form-control"
//             //                     value={password}
//             //                     onChange={this.onPasswordChange}
//             //                 />
//             //             </div>

//             //             {loginError !== '' && (
//             //                 <div className='login-error'>
//             //                     <span className='login-error-message'>{loginError}</span>
//             //                 </div>
//             //             )}

//             //             <div className="form-group login">
//             //                 <input
//             //                     ref={this.btnLogin}
//             //                     id="btnLogin"
//             //                     type="submit"
//             //                     className="btn"
//             //                     value={LanguageUtils.getMessageByKey("login.login", lang)}
//             //                     onClick={this.processLogin}
//             //                 />
//             //             </div>
//             //         </div>
//             //     </div>
//             // </div>
//             <div className='login-wrapper'>
//                 <div className='login-container'>
//                     <div className={isLogin && isLogin === true ? "container" : "container right-panel-active"}>
//                         {/* container right-panel-active */}
//                         <div className="form-container sign-up-container">
//                             <form action="#">
//                                 <h1>Create Account</h1>
//                                 <div className="social-container">
//                                     <i className="fab fa-facebook-f"></i>
//                                     <i className="fab fa-google-plus-g"></i>
//                                     <i className="fab fa-linkedin-in"></i>
//                                 </div>
//                                 <span>or use your email for registration</span>
//                                 <input type="text" placeholder="Name"
//                                     onChange={(event) => this.handleOnChangeInput(event, 'cName')}

//                                     value={this.state.cName}
//                                 />
//                                 <input type="email" placeholder="Email"
//                                     onChange={(event) => this.handleOnChangeInput(event, 'cEmail')}
//                                     value={this.state.cEmail}

//                                 />
//                                 <input type="password" placeholder="Password"
//                                     onChange={(event) => this.handleOnChangeInput(event, 'cPassword')}
//                                     value={this.state.cPassword}

//                                 />
//                                 <button type='button'
//                                     onClick={() => this.handleOnsingup()}
//                                 >Sign Up</button>
//                             </form>
//                         </div>
//                         <div className="form-container sign-in-container">
//                             <form action="#">
//                                 <h1>Sign in</h1>
//                                 <div className="social-container">
//                                     <i className="fab fa-facebook-f"></i>
//                                     <i className="fab fa-google-plus-g"></i>
//                                     <i className="fab fa-linkedin-in"></i>
//                                 </div>
//                                 <span>or use your account</span>
//                                 <input type="email" placeholder="Email"
//                                     onChange={(event) => this.handleOnChangeInput(event, 'email')}
//                                     value={this.state.email}
//                                 />
//                                 {isShowPass === false ?

//                                     <input type="password" placeholder="Password"
//                                         onChange={(event) => this.handleOnChangeInput(event, 'password')}
//                                         value={this.state.password}
//                                     />
//                                     :

//                                     <input type="text" placeholder="Password"
//                                         onChange={(event) => this.handleOnChangeInput(event, 'password')}
//                                         value={this.state.password}
//                                     />
//                                 }

//                                 {/* <span className='btn-eye'
//                                     onClick={() => this.handleShowPassword()}
//                                 >
//                                     <i className={isShowPass === false ? 'fa fa-eye' : 'fa fa-eye-slash'}></i>
//                                 </span> */}
//                                 <div className='errMessage'>
//                                     {errMessager}
//                                 </div>
//                                 <button type='button'
//                                     onClick={() => this.hanleOnClickSingin()}
//                                 >Sign In</button>
//                             </form>
//                         </div>
//                         <div className="overlay-container">
//                             <div className="overlay">
//                                 <div className="overlay-panel overlay-left">
//                                     <h1>Welcome Back!</h1>
//                                     <p>To keep connected with us please login with your personal info</p>
//                                     <button
//                                         onClick={() => this.handleChangeLogin()}
//                                         className="ghost" id="signIn">Sign In</button>
//                                 </div>
//                                 <div className="overlay-panel overlay-right">
//                                     <h1>Hello, Friend!</h1>
//                                     <p>Enter your personal details and start journey with us</p>
//                                     <button
//                                         onClick={() => this.handleChangeLogin()}
//                                         className="ghost" id="signUp">Sign Up</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div >
//         )
//     }
// }

// const mapStateToProps = state => {
//     return {
//         isLoggedIn: state.user.isLoggedIn,
//         userInfo: state.user.userInfo,
//         lang: state.app.language
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         // navigate: (path) => dispatch(push(path)),
//         // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
//         // adminLoginFail: () => dispatch(actions.adminLoginFail()),

//         userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Login);
