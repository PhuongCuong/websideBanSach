import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import Header from '../../Header/Header';
import { hanlegetAlluser } from '../../../services/userService'
import CreateUserModal from './CreateUserModal';
import { handleGetallCodeByType, handleNewUseradmin, handleDeleteUser } from '../../../services/userService'
import { toast } from 'react-toastify';
import EditUserModal from './EditUserModal';


class UserManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrUser: [],
            isShowmodal: false,
            isOpenEdit: false,
            isShowmodalEdit: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.handleReaddata();
    }

    handleReaddata = async () => {
        let res = await hanlegetAlluser('ALL');
        if (res && res.errCode === 0) {
            this.setState({
                arrUser: res.data
            }, () => { })
        }

    }

    handleCreateNewUser = async (data) => {
        let res = await handleNewUseradmin(data);
        if (res && res.errCode === 0) {
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
                isShowmodal: false
            })

            await this.handleReaddata();
        }
        else {
            toast.error('create new user is error!')
        }
    }

    handleDeleteUser = async (user) => {
        let res = await handleDeleteUser(user.id);
        console.log(res)
        if (res && res.errCode === 0) {
            toast.success('🦄 delete user success!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            await this.handleReaddata();

        } else {
            toast.error('create new user is error!')

        }
    }

    handleShowmodal = () => {
        this.setState({
            isShowmodal: !this.state.isShowmodal
        })
    }

    handleShowmodalEdit = () => {
        this.setState({
            isShowmodalEdit: !this.state.isShowmodalEdit
        })
    }

    handleRequired = () => {
        this.setState({
            isOpenEdit: !this.state.isOpenEdit
        })
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenEdit: !this.state.isOpenEdit,
            userEdit: user
        })

    }


    render() {
        let { arrUser, isShowmodal, isOpenEdit, isShowmodalEdit } = this.state;
        return (
            <div className='user-manager-container'>
                <CreateUserModal
                    showmodal={isShowmodal}
                    handleShowmodal={this.handleShowmodal}
                    handleReaddata={this.handleReaddata}
                    handleCreateNewUser={this.handleCreateNewUser}
                />

                <EditUserModal
                    showmodalEdit={isShowmodalEdit}
                    handleShowmodalEdit={this.handleShowmodalEdit}
                    handleEditUser={this.handleEditUser}
                    DataUser={this.state.userEdit}
                    handleReaddata={this.handleReaddata}
                    handleRequired={this.handleRequired}
                />

                <div className='user-manager-header'>
                    <Header />
                </div>
                <div className='user-manager-body'>
                    <div className='user-manager-title'>
                        Quản lý người dùng
                    </div>
                    <div className='user-manage-create'>
                        {isOpenEdit === false
                            ?
                            <button className='btn-create-user'
                                onClick={() => this.handleShowmodal()}
                            >
                                <i className="fas fa-plus-circle"></i>Tạo người dùng
                            </button>
                            :
                            <button className='btn-edit-user'
                                onClick={() => this.handleShowmodalEdit()}
                            >
                                <i className="fas fa-plus-circle"></i>Sửa người dùng
                            </button>
                        }

                    </div>
                    <div className='user-manager-table'>
                        <table id="customers">
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th>email</th>
                                    <th>address</th>
                                    <th>phoneNumber</th>
                                    <th>roleId</th>
                                    <th>option</th>
                                </tr>
                                {arrUser && arrUser.length > 0
                                    && arrUser.map((item, index) => {
                                        let imagebase64 = '';
                                        if (item.image) {
                                            imagebase64 = new Buffer(item.image, 'base64').toString('binary');
                                        }
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.email}</td>
                                                <td>{item.address}</td>
                                                <td>{item.phoneNumber}</td>
                                                <td>{item.roleData ? item.roleData.value : null}</td>

                                                <td>
                                                    <button className='btn-delete-um'
                                                        onClick={() => this.handleDeleteUser(item)}
                                                    ><i className='fa fa-trash'></i>Delete</button>
                                                    <button className='btn-edit-um'
                                                        onClick={() => this.handleEditUser(item)}
                                                    ><i className='fas fa-edit'></i>Edit</button>
                                                </td>

                                            </tr>
                                        )
                                    })
                                }
                            </tbody>

                        </table>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
