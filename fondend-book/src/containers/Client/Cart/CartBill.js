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

class CartBill extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    componentDidMount() {
    }


    render() {
        let { copybook, location } = this.props;
        console.log('check props', this.props)
        let tongtien = '';

        return (
            <div className='cart-bill-container'>
                <div className='cart-bill-content'>
                    <div className='cart-bill-header'>
                        <CartBillTail />
                    </div>
                    <div className='cart-bill-body'>
                        <div className='warning-login'>
                            <div className='left-warning'>
                                <div className='img-warning'></div>
                            </div>
                            <div className='right-warning'>
                                Bạn đã là thành viên?
                                <Link className='Link-login'>Đăng nhập ngay</Link>
                            </div>
                        </div>
                        <div className='cart-bill-order'>
                            <div className='order-title'>Thông tin nhận hàng</div>
                            <div className='order-form'>
                                <div className='row'>
                                    <div className='col-6 form-group'>
                                        <label>Họ tên</label>
                                        <input className='form-control' />
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label>Email</label>
                                        <input className='form-control' />
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label>Số điện thoại</label>
                                        <input className='form-control' />
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label>Địa chỉ nhận hàng</label>
                                        <input className='form-control' />
                                    </div>
                                </div>

                            </div>
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
                                <button className='btn-xac-nhan'>Xác nhận thanh toán</button>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartBill);
