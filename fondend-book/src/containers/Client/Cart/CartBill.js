import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './CartBill.scss';
import CartBillTail from './CartBillTail';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";
import { handleNewUseradmin } from '../../../services/userService'
import { toast } from 'react-toastify';
import {
    handleCreateNewBill, handleCreateNewBilldetail,
    handledeComfimBill
} from '../../../services/BillService'


class CartBill extends Component {

    constructor(props) {
        super(props)
        this.state = {
            hoTen: '',
            email: '',
            soDienThoai: '',
            address: ''
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    componentDidMount() {
    }

    handleCheckinput = () => {
        let check = true;
        let arr = ['hoTen', 'email', 'address', 'soDienThoai'];
        for (let i = 0; i < arr.length; i++) {
            if (!this.state[arr[i]]) {
                alert(`vui lòng nhập đủ thông tin:${arr[i]}`)
                check = false;
                break;
            }
        }

        return check;
    }

    handleOnChangeInput = (event, id) => {
        let copystate = { ...this.state };
        copystate[id] = event.target.value;
        this.setState({
            ...copystate
        })
    }

    handleXacNhan = async () => {
        let tongtien = 0;
        let { copybook, location } = this.props;
        if (location && location.state && location.state && location.state.checkboxes.length > 0) {
            location.state.checkboxes.map((item, index) => {
                if (item.discountData) {
                    tongtien += (+item.gia - (+item.discountData.discount * +item.gia)) * +item.soluongmua;
                } else {
                    tongtien += +item.gia * +item.soluongmua
                }
            })
        }
        if (this.props.isLoggedIn === false) {
            let check = this.handleCheckinput();
            if (check === true) {
                let billDetailDataArray =
                    location && location.state && location.state && location.state.checkboxes.length > 0 &&
                    location.state.checkboxes.map((item) => ({
                        bookId: item.keyMap,
                        soLuong: item.soluongmua,
                        thanhTien: item.discountData ? (+item.gia - (+item.discountData.discount * +item.gia)) * +item.soluongmua :
                            +item.gia * +item.soluongmua
                        ,
                        image: item.image,
                    }));
                let res = await handledeComfimBill({
                    firstName: this.state.hoTen,
                    email: this.state.email,
                    address: this.state.address,
                    phonenumber: this.state.soDienThoai,
                    roleId: 'R2',
                    tongTien: tongtien,
                    status: 'S1',
                    billDetailDataArray: billDetailDataArray
                })
                if (res && res.errCode === 0) {
                    toast.success('Tạo đơn đặt hàng thành công!');

                }
            }

        } else {
            if (this.state.address) {
                let billDetailDataArray =
                    location && location.state && location.state && location.state.checkboxes.length > 0 &&
                    location.state.checkboxes.map((item) => ({
                        bookId: item.keyMap,
                        soLuong: item.soluongmua,
                        thanhTien: item.discountData ? (+item.gia - (+item.discountData.discount * +item.gia)) * +item.soluongmua :
                            +item.gia * +item.soluongmua
                        ,
                        image: item.image,
                    }));
                let res = await handledeComfimBill({
                    firstName: this.props.userInfo.data.firstName,
                    email: this.props.userInfo.data.email,
                    address: this.state.address,
                    phonenumber: this.props.userInfo.data.phoneNumber,
                    roleId: this.props.userInfo.data.roleId,
                    tongTien: tongtien,
                    status: 'S1',
                    billDetailDataArray: billDetailDataArray
                })
                if (res && res.errCode === 0) {
                    toast.success('Tạo đơn đặt hàng thành công!')
                }
            }
            else {
                alert('Bạn chưa nhập địa chỉ nhận hàng!')
            }
        }


    }


    render() {
        let { copybook, location } = this.props;
        let tongtien = '';
        return (
            <div className='cart-bill-container'>
                <div className='cart-bill-content'>
                    <div className='cart-bill-header'>
                        <CartBillTail />
                    </div>
                    <div className='cart-bill-body'>
                        {this.props.isLoggedIn === true
                            ?
                            <></>
                            :
                            <div className='warning-login'>
                                <div className='left-warning'>
                                    <div className='img-warning'></div>
                                </div>
                                <div className='right-warning'>
                                    Bạn đã là thành viên?
                                    <Link className='Link-login' to='/login'>Đăng nhập ngay</Link>
                                </div>
                            </div>
                        }

                        <div className='cart-bill-order'>
                            <div className='order-title'>Thông tin nhận hàng</div>
                            {this.props.isLoggedIn === true
                                ?
                                <div className='order-form'>
                                    <div className='row'>

                                        <div className='col-6 form-group'>
                                            <label>Địa chỉ nhận hàng</label>
                                            <input className='form-control'
                                                value={this.state.address}
                                                onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                            />
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className='order-form'>
                                    <div className='row'>
                                        <div className='col-6 form-group'>
                                            <label>Họ tên</label>
                                            <input className='form-control'
                                                value={this.state.hoTen}
                                                onChange={(event) => this.handleOnChangeInput(event, 'hoTen')}
                                            />
                                        </div>
                                        <div className='col-6 form-group'>
                                            <label>Email</label>
                                            <input className='form-control'
                                                value={this.state.email}
                                                onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                            />
                                        </div>
                                        <div className='col-6 form-group'>
                                            <label>Số điện thoại</label>
                                            <input className='form-control'
                                                value={this.state.soDienThoai}
                                                onChange={(event) => this.handleOnChangeInput(event, 'soDienThoai')}
                                            />
                                        </div>
                                        <div className='col-6 form-group'>
                                            <label>Địa chỉ nhận hàng</label>
                                            <input className='form-control'
                                                value={this.state.address}
                                                onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                            />
                                        </div>
                                    </div>
                                </div>
                            }

                        </div>
                        <div className='cart-bill-info'>
                            <div className='cart-bill-info-title'>Thông tin đơn hàng</div>
                            {location && location.state && location.state && location.state.checkboxes.length > 0
                                && location.state.checkboxes.map((item, index) => {

                                    let mount = '';
                                    let mountDiscount = '';
                                    let thanhtien = '';
                                    let thanhtienDiscount = '';
                                    if (item.gia) {
                                        mount = parseFloat(item.gia).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                                        thanhtien = parseFloat(item.gia * item.soluongmua).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                                        if (item.discountData && item.discountData.discount) {
                                            mountDiscount = parseFloat(item.gia - (item.discountData.discount * item.gia)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                                            thanhtienDiscount = parseFloat((item.gia - (item.discountData.discount * item.gia)) * item.soluongmua).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

                                        }

                                    }
                                    return (
                                        <div className='product-incart' key={index}
                                        >
                                            <div className='img-product' style={{ backgroundImage: `url(${item.image})` }}

                                            ></div>
                                            <div className='info-product'>
                                                <div className='ten-sach'>{item.tenSach}</div>
                                                {item.discountData && item.discountData.discount
                                                    ?
                                                    <>
                                                        <div className='gia-sach'>{mountDiscount}</div>
                                                        <div className='gia-sach-discount'>{mount}</div>
                                                    </>
                                                    :
                                                    <div className='gia-sach'>{mount}</div>

                                                }
                                            </div>
                                            <div className='desgin-input-number'>
                                                {item.soluongmua}
                                            </div>
                                            {item.discountData && item.discountData.discount
                                                ?
                                                <>
                                                    <div className='thanh-tien'>{thanhtienDiscount}</div>
                                                </>
                                                :
                                                <div className='thanh-tien'>{thanhtien}</div>

                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='cart-bill-btn'>
                            <div className='cart-bill-btn-title'>Thanh toán</div>
                            <div className='cart-bill-toltal'>
                                <div className='text-toltal'>
                                    Tổng tiền thanh toán:
                                </div>
                                {location && location.state && location.state && location.state.checkboxes.length > 0
                                    &&
                                    location.state.checkboxes.map((item, index) => {
                                        let mount = '';
                                        let mountDiscount = '';
                                        let thanhtien = '';
                                        if (item.gia) {
                                            mount = parseFloat(item.gia).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                                            thanhtien = item.gia * item.soluongmua;
                                            if (item.discountData && item.discountData.discount) {
                                                mountDiscount = parseFloat(item.gia - (item.discountData.discount * item.gia)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                                                thanhtien = (item.gia - (item.discountData.discount * item.gia)) * item.soluongmua;

                                            }

                                        }
                                        tongtien = +tongtien + thanhtien;
                                    })
                                    &&
                                    <div className='toltal-mount'>{parseFloat(tongtien).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                }
                                <button className='btn-xac-nhan'
                                    onClick={() => this.handleXacNhan()}
                                >Xác nhận thanh toán</button>
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
        copybook: state.book.copybook,
        bookInfo: state.book.bookInfo,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartBill);
