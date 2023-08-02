import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalChangePassword.scss'
import { handleUpdateUser, hanlegetAlluserbyemail, handleupdatePassword } from '../../../services/userService'
import { toast } from 'react-toastify';

class ModalChangePassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            passwordbefor: '',
            passwordafter: '',
            passwordecomfim: ''
        }
    }

    async componentDidMount() {
    }

    handleOnChangeInput = (event, id) => {
        let copystate = { ...this.state };
        copystate[id] = event.target.value;
        this.setState({
            ...copystate
        })
    }

    handleCheckInput = () => {
        let isCheck = true;
        let arr = ['passwordbefor', 'passwordafter', 'passwordecomfim'];
        for (let i = 0; i < arr.length; i++) {
            if (!this.state[arr[i]]) {
                isCheck = false;
                alert(`bạn chưa nhập đủ giá trị :${arr[i]}`);
                break;
            }
        }
        return isCheck;
    }


    handleSave = async () => {
        let check = this.handleCheckInput();
        if (check === true) {
            if (this.state.passwordafter !== this.state.passwordecomfim) {
                alert('Mật khẩu xác nhận chưa phù hợp')
            } else {
                let updateUser = await handleupdatePassword({
                    id: this.props.userId,
                    passwordbefor: this.state.passwordbefor,
                    passwordcomfim: this.state.passwordafter
                });
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
                    await this.props.handleShowchangePass()
                }
                else {
                    alert(updateUser.errMessanger)
                }
            }
        }
    }

    render() {
        return (
            <>
                <Modal show={this.props.isShowChangePass} onHide={this.props.handleShowchangePass} centered={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Đổi mật khẩu</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='row'>
                            <div className='col-12 form-group'>
                                <label>Mật khẩu ban đầu</label>
                                <input type='password' className='form-control'
                                    value={this.state.passwordbefor}
                                    onChange={(event) => this.handleOnChangeInput(event, 'passwordbefor')}

                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label>Mật khẩu thay đổi</label>
                                <input type='password' className='form-control'
                                    value={this.state.passwordafter}
                                    onChange={(event) => this.handleOnChangeInput(event, 'passwordafter')}
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label>Nhập lại mật khẩu thay đổi</label>
                                <input type='password' className='form-control'
                                    value={this.state.passwordecomfim}
                                    onChange={(event) => this.handleOnChangeInput(event, 'passwordecomfim')}
                                />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary"
                            onClick={this.props.handleShowchangePass}
                        >
                            Close
                        </Button>
                        <Button variant="primary"
                            onClick={() => this.handleSave()}
                        >
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>

        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalChangePassword);
