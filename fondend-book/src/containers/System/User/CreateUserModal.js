import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CommonUtils } from '../../../utils'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './CreateUserModal.scss';
import Select from 'react-select'
import { handleGetallCodeByType, handleNewUseradmin } from '../../../services/userService'
import Lightbox from 'react-image-lightbox';
import { toast } from 'react-toastify';



class CreateUserModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listGender: [],
            listRole: [],
            previewImg: [],
            isOpen: false,

            selectedGender: '',
            selectedRoleId: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            address: '',
            phoneNumber: '',
            gender: '',
            roleId: '',
            avatar: '',

        }
    }

    async componentDidMount() {
        this.handlelistSelect()
    }

    buildInputSelect = async (type) => {
        let arr = [];
        let data = await handleGetallCodeByType(type)
        if (data && data.data && data.errCode === 0) {
            if (type === 'USER' || type === 'GENDER') {
                data.data.map((item, index) => {
                    let object = {};

                    object.value = item.keyMap;
                    object.label = item.value;

                    arr.push(object);
                }

                )
            }
        }

        return arr;
    }

    handlelistSelect = async () => {
        let listgender = await this.buildInputSelect('GENDER');
        let listuser = await this.buildInputSelect('USER');
        this.setState({
            listGender: listgender,
            listRole: listuser,
            gender: this.state.listGender && this.state.listGender.length > 0 ? this.state.listGender[0].value : '',
            roleId: this.state.listRole && this.state.listRole.length > 0 ? this.state.listRole[0].value : '',

        })
    }



    handleOnChangefile = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let ObjectURL = URL.createObjectURL(file);
            this.setState({
                previewImg: ObjectURL,
                avatar: base64
            })
        }

    }

    handlePreviewImg = () => {
        if (!this.state.previewImg) return;
        this.setState({
            isOpen: true
        })
    }

    handleOnChangeText = (event, id) => {
        let copystate = { ...this.state };
        copystate[id] = event.target.value;
        this.setState({
            ...copystate
        })
        console.log('check state', this.state)
    }

    handleCheckinput = () => {
        let isCheck = true;
        let arr = ['firstName', 'lastName', 'email', 'password', 'address', 'phoneNumber', 'gender', 'roleId', 'avatar'];
        for (let i = 0; i < arr.length; i++) {
            if (!this.state[arr[i]]) {
                isCheck = false;
                alert(`missing input :${arr[i]}`);
                break;
            }
        }
        return isCheck;
    }

    handleOnClickSave = async () => {
        let check = this.handleCheckinput();
        if (check === true) {
            let data = await this.props.handleCreateNewUser({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.roleId,
                image: this.state.avatar,
            })

            this.setState({
                selectedGender: '',
                selectedRoleId: '',
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                address: '',
                phoneNumber: '',
                gender: '',
                roleId: '',
                avatar: '',
                previewImg: [],

            })

        }

    }


    handleOnChangSelected = async (selectedOption, name) => {
        let stateName = name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;

        this.setState({
            ...stateCopy
        })


    }


    render() {
        let { listGender, listRole, isOpen, gender, roleId } = this.state;
        return (
            <div className='modal-container'>
                <Modal
                    show={this.props.showmodal}
                    // onHide={() => setShow(false)}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                    size='lg'
                >
                    <div className='modal-header'>
                        <div className='modal-title'>Create a new user</div>
                        <div className='modal-btn' onClick={this.props.handleShowmodal}><i className="fas fa-times-circle"></i></div>
                    </div>
                    <div className='modal-body row'>
                        <div className='col-6 form-group'>
                            <label>firstName</label>
                            <input className='form-control' type='text'
                                onChange={(event) => this.handleOnChangeText(event, 'firstName')}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className='col-6'>
                            <label>lastName</label>
                            <input className='form-control' type='text'
                                onChange={(event) => this.handleOnChangeText(event, 'lastName')}
                                value={this.state.lastName}

                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>email</label>
                            <input className='form-control' type='email'
                                onChange={(event) => this.handleOnChangeText(event, 'email')}
                                value={this.state.email}

                            />
                        </div>
                        <div className='col-6'>
                            <label>password</label>
                            <input className='form-control' type='password'
                                onChange={(event) => this.handleOnChangeText(event, 'password')}
                                value={this.state.password}

                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>address</label>
                            <input className='form-control' type='text'
                                onChange={(event) => this.handleOnChangeText(event, 'address')}
                                value={this.state.address}

                            />
                        </div>
                        <div className='col-6'>
                            <label>phoneNumber</label>
                            <input className='form-control' type='text'
                                onChange={(event) => this.handleOnChangeText(event, 'phoneNumber')}
                                value={this.state.phoneNumber}

                            />
                        </div>
                        <div className='col-4'>
                            <label>gender</label>
                            <select className='form-control'
                                onChange={(event) => this.handleOnChangeText(event, 'gender')}
                                value={gender}
                            >
                                {listGender && listGender.length > 0
                                    && listGender.map((item, index) => {
                                        return (
                                            <option key={index} value={item.value}>{item.label}</option>
                                        )
                                    })
                                }
                            </select>

                        </div>
                        <div className='col-4 form-group'>
                            <label>roleId</label>
                            <select className='form-control'
                                onChange={(event) => this.handleOnChangeText(event, 'roleId')}
                            >
                                {listRole && listRole.length > 0
                                    && listRole.map((item, index) => {
                                        return (
                                            <option key={index} value={item.value}>{item.label}</option>
                                        )
                                    })
                                }
                            </select>

                        </div>
                        <div className='col-4'>
                            <label>image</label>
                            <div className='preview-content'>
                                <input id='previewImg' type='file' hidden onChange={(event) => this.handleOnChangefile(event)} />
                                <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className="fas fa-upload"></i></label>
                                <div className='preview-image'
                                    // onClick={() => this.handlePreviewImg()}
                                    style={{ backgroundImage: `url(${this.state.previewImg})` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button className='btn-save'
                            onClick={() => this.handleOnClickSave()}
                        ><i className="fas fa-save"></i>Save</button>
                        <button className='btn-cancel'
                            onClick={this.props.handleShowmodal}
                        ><i className="fas fa-window-close"></i>Cancel</button>

                    </div>

                </Modal>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImg}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserModal);
