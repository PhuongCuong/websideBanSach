import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './BillManage.scss'
import Header from '../../Header/Header';
import {
    hanlegetAllBill, hanlegetAllBilldetail, handleDeleteBill,
    handleDeleteBilldetail, handleUpdateBill, handleUpdateBilldetail,
    handledeleteBillandBillDetail, handleCreateNewBill
} from '../../../services/BillService'

import { hanlegetAlluser, hanlegetAlluserbyemail } from '../../../services/userService';

import moment from 'moment/moment';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router';
import Select from 'react-select'
import ModalUser from './Modal/ModalUser';


class BillManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrBill: [],
            arrBillDetail: [],
            userId: '',
            hoten: '',
            address: '',
            phoneNumber: '',
            email: {},
            ngaydat: '',
            isShowClick: {},
            isShowChoose: false,
            maHD: '',
            tongTien: '',
            arrUser: [],
            arrMailUser: [],
            isShowModal: false
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    async componentDidMount() {
        await this.handlegetAllbill()
        await this.handleGetAllUser()
        await this.handleConvertSelect()
    }

    handleConvertSelect = () => {
        let { arrUser } = this.state;
        if (arrUser && arrUser.length > 0) {
            let arr = arrUser.map(item => {
                return {
                    value: item.email,
                    label: item.email,
                }
            })
            this.setState({
                arrMailUser: arr
            })
        }
    }

    handleGetAllUser = async () => {
        let res = await hanlegetAlluser('ALL');
        if (res && res.errCode === 0) {
            let arr = [];
            let object = {};

            this.setState({
                arrUser: res.data
            })
        }
    }


    handlegetAllbill = async () => {
        let res = await hanlegetAllBill('ALL');
        if (res && res.errCode === 0) {
            this.setState({
                arrBill: res.data
            })
        }
    }

    hanlegetAllBilldetail = async (maHD) => {
        let res = await hanlegetAllBilldetail(maHD);
        if (res && res.errCode === 0) {
            this.setState({
                arrBillDetail: res.data
            })
        }
    }
    handleOnclickDetail = async (item) => {
        await this.hanlegetAllBilldetail(item.id);
        this.setState({
            userId: item.userId,
            hoten: item.UserData && item.UserData.firstName ? item.UserData.firstName : '',
            address: item.UserData && item.UserData.address ? item.UserData.address : '',
            phoneNumber: item.UserData && item.UserData.phoneNumber ? item.UserData.phoneNumber : '',
            email: {
                value: item.UserData && item.UserData.email ? item.UserData.email : '',
                label: item.UserData && item.UserData.email ? item.UserData.email : ''
            },
            ngaydat: moment(item.createdAt).format('HH:mm:ss DD/MM/YYYY'),
            isShowClick: item,
            isShowChoose: item.status === 'S1' ? true : false,
            maHD: item.id,
            tongTien: item.tongTien
        })

    }

    handleHuy = async () => {
        let data = await handledeleteBillandBillDetail({
            maHD: this.state.maHD
        });
        if (data && data.errCode === 0) {
            toast.success('Hủy đơn hàng thành công!')
            await this.handlegetAllbill();
        } else {
            alert(data.errMessager)
        }
    }

    handleXacNhan = async () => {
        let res = await handleUpdateBill({
            tongTien: this.state.tongTien,
            status: 'S2',
            maHD: this.state.maHD
        });
        if (res && res.errCode === 0) {
            toast.success('Xác nhận đơn hàng đã được thanh toán!');
            await this.handlegetAllbill();

        }

    }

    handleEdit = () => {
        if (this.props.history) {
            this.props.history.push({
                pathname: '/system/bill-detail-manage',
                state: {
                    isShowClick: this.state.isShowClick,
                    arrBillDetail: this.state.arrBillDetail
                }
            })
        }
    }

    handeCheckinput = () => {
        let check = true;
        let arr = ['userId', 'hoten', 'phoneNumber', 'email', 'address'];
        for (let i = 0; i < arr.length; i++) {
            if (!this.state[arr[i]]) {
                alert(`Missing parament:${arr[i]}`);
                check = false;
                break;
            }
        }
        return check;
    }

    handleCreateBill = async () => {
        let check = this.handeCheckinput();
        if (check === true) {
            let data1 = await handleCreateNewBill({
                userId: this.state.userId,
                status: 'S1',
                tongTien: 0,
            })
            if (data1 && data1.errCode === 0) {
                toast.success('Tạo hóa đơn mới thành công!');
                await this.handlegetAllbill()
            } else {
                alert(data1.errMessage)
            }
        }
    }

    handleChangeSelect = async (selectedOption) => {
        let data = await hanlegetAlluserbyemail(selectedOption.value);
        if (data && data.errCode === 0) {
            this.setState({
                email: selectedOption,
                userId: data.data.id,
                hoten: data.data.firstName,
                address: data.data.address,
                phoneNumber: data.data.phoneNumber
            })
        }


    }

    handleShowModal = () => {
        this.setState({
            isShowModal: !this.state.isShowModal
        })
    }


    render() {
        let { arrBill, arrBillDetail, isShowClick, isShowChoose, arrMailUser } = this.state;
        return (
            <div className='bill-manage-container'>
                <div className='bill-manage-content'>
                    <div className='bill-manage-header'>
                        <Header />
                    </div>
                    <div className='bill-manage-title'>
                        Quản lý hóa đơn
                    </div>
                    <div className='bill-manage-body'>
                        <div className='bill-info-customer row'>
                            <div className='col-6 form-group'>
                                <label>Mã khách hàng:</label>
                                <input type='text' className='form-control'
                                    value={this.state.userId}
                                    readOnly
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Họ tên:</label>
                                <input type='text' className='form-control'
                                    value={this.state.hoten}
                                    readOnly

                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Địa chỉ:</label>
                                <input type='text' className='form-control'
                                    value={this.state.address}
                                    readOnly

                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Số điện thoại</label>
                                <input type='text' className='form-control'
                                    value={this.state.phoneNumber}
                                    readOnly

                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Email</label>
                                <Select
                                    options={arrMailUser}
                                    onChange={this.handleChangeSelect}
                                    value={this.state.email}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Ngày đặt</label>
                                <input type='text' className='form-control'
                                    value={this.state.ngaydat}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className='bill-table-manager'>


                            <div className='bill-table'>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Mã HĐ</th>
                                            <th>Mã KH</th>
                                            <th>Tên KH</th>
                                            <th>Địa chỉ</th>
                                            <th>Tổng tiền</th>
                                            <th>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    {arrBill && arrBill.length > 0 &&
                                        arrBill.map((item, index) => {
                                            return (
                                                <tr className={isShowClick === item ? 'active' : ''}
                                                    key={index}
                                                    onClick={() => this.handleOnclickDetail(item)}
                                                >
                                                    <td>{index + 1}</td>
                                                    <td>{item.id}</td>
                                                    <td>{item.userId}</td>
                                                    <td>{item.UserData && item.UserData.firstName ? item.UserData.firstName : ''}</td>
                                                    <td>{item.UserData && item.UserData.address ? item.UserData.address : ''}</td>
                                                    <td>{parseFloat(item.tongTien).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                                    <td>{item.statusData.value}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </table>
                            </div>
                            <div className='bill-detail-table'>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Mã SP</th>
                                            <th>Tên SP</th>
                                            <th>Số Lượng</th>
                                            <th>Tổng tiền</th>
                                            <th>Image</th>

                                        </tr>
                                    </thead>
                                    {arrBillDetail && arrBillDetail.length > 0 &&
                                        arrBillDetail.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td>{item.bookId}</td>
                                                    <td>{item.BookData.tenSach}</td>
                                                    <td>{item.soLuong}</td>
                                                    <td>{parseFloat(item.thanhTien).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                                    <td className='img-SP'
                                                        style={{ backgroundImage: `url(${item.image})` }}
                                                    ></td>

                                                </tr>
                                            )
                                        })
                                    }
                                </table>
                            </div>

                        </div>
                        {
                            isShowChoose === true ?
                                <div className='choose-bill'>
                                    <button className='btn-xacnhan'
                                        onClick={() => this.handleXacNhan()}
                                    ><i className="fas fa-check-circle"></i>Xác nhận thanh toán</button>
                                    <button className='btn-sua'
                                        onClick={() => this.handleEdit()}
                                    ><i className="far fa-edit"></i>Sửa</button>
                                    <button className='btn-huy'
                                        onClick={() => this.handleHuy()}
                                    >Hủy</button>

                                </div>
                                :
                                <></>
                        }

                        <div className='add-new-bill'>
                            <div className='btn-add-new-bill'>
                                <button className='btn-add-bill'
                                    onClick={() => this.handleCreateBill()}
                                >Tạo hóa đơn mới</button>
                                <button className='btn-add-customer'
                                    onClick={() => this.handleShowModal()}
                                ><i className="far fa-user"></i>Thêm Khách Hàng</button>
                            </div>
                        </div>
                    </div>
                </div>

                <ModalUser
                    isShowModal={this.state.isShowModal}
                    handleShowModal={this.handleShowModal}
                    handleGetAllUser={this.handleGetAllUser}
                    handleConvertSelect={this.handleConvertSelect}

                />
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(BillManage);
