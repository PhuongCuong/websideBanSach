import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Infouser.scss'
import HomeHeader from './HomeHeader';
import ListChooseaction from './ListChooseaction';
import ModalChangePassword from './ModalChangePassword';
import _ from 'lodash';
import { handleUpdateUser, hanlegetAlluserbyemail } from '../../../services/userService'
import { toast } from 'react-toastify';
import * as actions from "../../../store/actions";

class Infouser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isShowChangePass: false,
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            gender: '',
            address: '',
            password: '',
            preview: '',
            file: '',
            userId: ''
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location.state !== this.props.location.state) {
            const newData = this.props.location.state.data;
            this.setState({
                firstName: newData.firstName,
                lastName: newData.lastName,
                email: newData.email,
                gender: newData.gender,
                phoneNumber: newData.phoneNumber,
                address: newData.address,
                file: newData.image,
                preview: newData.image,
            });
        }
    }

    componentDidMount() {
        if (!_.isEmpty(this.props.location.state) && !_.isEmpty(this.props.location.state.data)) {
            this.setState({
                firstName: this.props.location.state.data.firstName,
                lastName: this.props.location.state.data.lastName,
                email: this.props.location.state.data.email,
                gender: this.props.location.state.data.gender,
                address: this.props.location.state.data.address,
                phoneNumber: this.props.location.state.data.phoneNumber,
                file: this.props.location.state.data.image,
                preview: this.props.location.state.data.image,
                userId: this.props.location.state.data.id,
            })

        }
    }

    handleCheckinput = () => {
        let isCheck = true;
        let arr = ['firstName', 'lastName', 'email', 'address', 'phoneNumber', 'gender'];
        for (let i = 0; i < arr.length; i++) {
            if (!this.state[arr[i]]) {
                isCheck = false;
                alert(`missing input :${arr[i]}`);
                break;
            }
        }
        return isCheck;
    }

    handleShowchangePass = () => {
        this.setState({
            isShowChangePass: !this.state.isShowChangePass
        })
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleOnChangefile = async (event) => {
        let file = event.target.files[0];
        let ObjectURL = URL.createObjectURL(file);
        this.setState({
            file: file,
            preview: ObjectURL
        })
    }

    handleOnChangeGender = (event) => {
        this.setState({
            gender: event.target.checked
        })
    }

    handleOnClickSavaChange = async () => {
        let check = this.handleCheckinput();
        if (check === true) {
            const formData = new FormData();
            formData.append("firstName", this.state.firstName)
            formData.append("lastName", this.state.lastName)
            formData.append("email", this.state.email)
            formData.append("address", this.state.address)
            formData.append("phoneNumber", this.state.phoneNumber)
            formData.append("gender", this.state.gender)
            formData.append("image", this.state.file)
            formData.append("id", this.state.userId)
            let updateUser = await handleUpdateUser(formData);
            if (updateUser && updateUser.errCode === 0) {
                toast.success('🦄 update user success!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                let data = await hanlegetAlluserbyemail(this.state.email);
                if (data && data.errCode === 0) {
                    this.props.userLoginSuccess(data)
                }
            } else {
                toast.error('update user is error!')
            }
        }

        console.log('check state', this.state)

    }


    render() {
        let { isShowChangePass } = this.state

        return (
            <div className='user-info-container'>
                <div className='user-info-content'>
                    <div className='user-info-header'>
                        <HomeHeader />
                    </div>
                    <div className='user-info-body'>
                        <div className='user-info-in-body'>
                            <div className='user-info-left'>
                                <ListChooseaction />
                            </div>
                            <div className='user-info-right'>
                                <div className='user-info-title'>Thông tin tài khoản</div>
                                <div className='user-info-chill'>
                                    <div className='user-info-chill-title'>Thông tin cá nhân</div>
                                    <div className='user-info-chill-up'>
                                        <div className='user-info-chill-left'>
                                            <input type='file' hidden id='previewImg'
                                                onChange={(event) => this.handleOnChangefile(event)}
                                            />
                                            <label className='user-info-image' htmlFor='previewImg'
                                                style={{ backgroundImage: `url(${this.state.preview})` }

                                                }
                                            ></label>
                                            <label className='user-info-edit-img' htmlFor='previewImg'>
                                                <div className='edit-img'></div>
                                            </label>
                                        </div>
                                        <div className='user-info-chill-right row'>
                                            <div className='col-6'>
                                                <label>Họ:</label>
                                                <input type='text' className='form-control'
                                                    value={this.state.firstName}
                                                    onChange={(event) => this.handleOnChangeInput(event, 'firstName')}
                                                />
                                            </div>
                                            <div className='col-6'>
                                                <label>Tên:</label>
                                                <input type='text' className='form-control'
                                                    value={this.state.lastName}
                                                    onChange={(event) => this.handleOnChangeInput(event, 'lastName')}

                                                />
                                            </div>
                                            <div className='col-6'>
                                                <label>email:</label>
                                                <input type='text' className='form-control'
                                                    value={this.state.email}
                                                    onChange={(event) => this.handleOnChangeInput(event, 'email')}

                                                />
                                            </div>
                                            <div className='col-6'>
                                                <label>Số điện thoại:</label>
                                                <input type='text' className='form-control'
                                                    value={this.state.phoneNumber}
                                                    onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}

                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='user-info-chill-down row'>
                                        <div className='col-6 user-info-gender'>
                                            <label className='text-gender'>Giới tính</label>
                                            <label className='select-radio-item'>
                                                <input type='radio' className='check-input-radio'
                                                    value='M'
                                                    onChange={(event) => this.handleOnChangeInput(event, 'gender')}
                                                    checked={this.state.gender === 'M'}

                                                />
                                                <span className='label'>Nam</span>
                                            </label>
                                            <label className='select-radio-item'>
                                                <input type='radio' className='check-input-radio'
                                                    value='FM'
                                                    onChange={(event) => this.handleOnChangeInput(event, 'gender')}
                                                    checked={this.state.gender === 'FM'}

                                                />
                                                <span className='label'>Nữ</span>
                                            </label>
                                            <label className='select-radio-item'>
                                                <input type='radio' className='check-input-radio'
                                                    value='O'
                                                    onChange={(event) => this.handleOnChangeInput(event, 'gender')}
                                                    checked={this.state.gender === 'O'}

                                                />
                                                <span className='label'>Khác</span>
                                            </label>
                                        </div>

                                        <div className='col-6 user-info-address'>
                                            <label>Địa chỉ</label>
                                            <input type='text' className='form-control'
                                                value={this.state.address}
                                                onChange={(event) => this.handleOnChangeInput(event, 'gender')}

                                            />
                                        </div>
                                    </div>
                                    <div className='user-info-btn'>
                                        <button className='btn-save-change'
                                            onClick={() => this.handleOnClickSavaChange()}
                                        >Lưu thay đổi</button>
                                        <button className='btn-change-pass'
                                            onClick={() => this.handleShowchangePass()}
                                        >Đổi mật khẩu</button>
                                    </div>
                                </div>
                                <ModalChangePassword
                                    isShowChangePass={this.state.isShowChangePass}
                                    handleShowchangePass={this.handleShowchangePass}
                                    userId={this.state.userId}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Infouser);
