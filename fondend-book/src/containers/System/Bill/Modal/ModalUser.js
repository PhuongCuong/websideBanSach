import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalUser.scss'
import { handlecountAllTL } from '../../../../services/bookService'
import { handleNewUseradmin } from '../../../../services/userService'
import { toast } from 'react-toastify';


class ModalUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hoten: '',
            address: '',
            phoneNumber: '',
            email: ''
        }
    }

    async componentDidMount() {
    }

    handleOnChangeInput = (event, id) => {
        let statecopy = { ...this.state };
        statecopy[id] = event.target.value;
        this.setState({
            ...statecopy
        })
    }

    handleCheckinput = () => {
        let check = true;
        let arr = ['hoten', 'address', 'phoneNumber', 'email'];
        for (let i = 0; i < arr.length; i++) {
            if (!this.state[arr[i]]) {
                alert(`Missing input: ${arr[i]}`);
                check = false;
                break;
            }
        }
        return check;
    }

    handleEnter = async (event) => {
        if (event.key === 'Enter') {
            let check = this.handleCheckinput();
            if (check === true) {
                let data = await handleNewUseradmin({
                    firstName: this.state.hoten,
                    email: this.state.email,
                    address: this.state.address,
                    phonenumber: this.state.phoneNumber,
                    roleId: 'R2'
                })
                if (data && data.errCode === 0) {
                    toast.success('Thêm khách hàng mới thành công!')
                    await this.props.handleShowModal();
                    await this.props.handleGetAllUser();
                    await this.props.handleConvertSelect()
                } else {
                    alert(data.errMessage)
                }
            }
        }
    }


    handleSave = async () => {
        let check = this.handleCheckinput();
        if (check === true) {
            let data = await handleNewUseradmin({
                firstName: this.state.hoten,
                email: this.state.email,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                roleId: 'R2'
            })
            if (data && data.errCode === 0) {
                toast.success('Thêm khách hàng mới thành công!')
                await this.props.handleShowModal();
                await this.props.handleGetAllUser();
                await this.props.handleConvertSelect()
            } else {
                alert(data.errMessage)
            }
        }
    }



    render() {
        return (
            <>
                <Modal show={this.props.isShowModal} onHide={this.props.handleShowModal} centered={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thông tin khách hàng</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Họ tên</label>
                                <input type='text' className='form-control'
                                    onChange={(event) => this.handleOnChangeInput(event, 'hoten')}
                                    value={this.state.soluong}
                                    onKeyPress={(event) => this.handleEnter(event)}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Địa chỉ</label>
                                <input type='text' className='form-control'
                                    onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                    value={this.state.soluong}
                                    onKeyPress={(event) => this.handleEnter(event)}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Số điện thoại</label>
                                <input type='text' className='form-control'
                                    onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                    value={this.state.soluong}
                                    onKeyPress={(event) => this.handleEnter(event)}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>email</label>
                                <input type='text' className='form-control'
                                    onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                    value={this.state.soluong}
                                    onKeyPress={(event) => this.handleEnter(event)}
                                />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary"
                            onClick={this.props.handleShowModal}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
