import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CommonUtils } from '../../../utils'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './EditUserModal.scss';
import Select from 'react-select'
import { handleGetallCodeByType, handleUpdateUser } from '../../../services/userService'
import Lightbox from 'react-image-lightbox';
import { toast } from 'react-toastify';



class EditUserModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listGender: [],
            listRole: [],
            isOpen: false,

            selectedGender: '',
            selectedRoleId: '',
            file: {},
            preview: [],
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            address: '',
            phoneNumber: '',
            gender: '',
            roleId: '',
            avatar: '',
            userId: '',
            userData: {}

        }
    }

    async componentDidMount() {
        await this.handlelistSelect()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.DataUser !== this.props.DataUser) {
            this.setState({
                userId: this.props.DataUser.id,
                firstName: this.props.DataUser.firstName,
                lastName: this.props.DataUser.lastName,
                email: this.props.DataUser.email,
                password: this.props.DataUser.password,
                address: this.props.DataUser.address,
                phoneNumber: this.props.DataUser.phoneNumber,
                gender: this.props.DataUser.gender,
                roleId: this.props.DataUser.roleId,
                avatar: this.props.DataUser.image,
                preview: this.props.DataUser.image
            })
        }
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
        let file = event.target.files[0];
        let ObjectURL = URL.createObjectURL(file);
        this.setState({
            file: file,
            preview: ObjectURL
        })
    }

    handlePreviewImg = () => {
        if (!this.state.preview) return;
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
    }

    handleCheckinput = () => {
        let isCheck = true;
        let arr = ['firstName', 'lastName', 'email', 'password', 'address', 'phoneNumber', 'gender', 'roleId'];
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
            const formData = new FormData();
            formData.append("firstName", this.state.firstName)
            formData.append("lastName", this.state.lastName)
            formData.append("email", this.state.email)
            formData.append("password", this.state.password)
            formData.append("address", this.state.address)
            formData.append("phoneNumber", this.state.phoneNumber)
            formData.append("gender", this.state.gender)
            formData.append("roleId", this.state.roleId)
            formData.append("image", this.state.file)
            formData.append("id", this.state.userId)
            console.log('check data', formData)
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

                this.setState({
                    preview: [],
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    address: '',
                    phoneNumber: '',
                    gender: '',
                    roleId: '',
                    userId: '',
                })

                await this.props.handleReaddata()
                await this.props.handleShowmodalEdit()
                await this.props.handleRequired()
            } else {
                toast.error('update user is error!')

            }
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

    handleUserData = async () => {

    }


    render() {
        let { listGender, listRole, isOpen, gender, roleId, userData } = this.state;


        return (
            <div className='modal-container'>
                <Modal
                    show={this.props.showmodalEdit}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                    size='lg'
                >
                    <div className='modal-header'>
                        <div className='modal-title'>Edit a user</div>
                        <div className='modal-btn' onClick={this.props.handleShowmodalEdit}><i className="fas fa-times-circle"></i></div>
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
                                value={this.state.gender}
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
                                value={this.state.roleId}
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
                                    style={{ backgroundImage: `url(${this.state.preview})` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button className='btn-save'
                            onClick={() => this.handleOnClickSave()}
                        ><i className="fas fa-save"></i>Save</button>
                        <button className='btn-cancel'
                            onClick={this.props.handleShowmodalEdit}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditUserModal);
