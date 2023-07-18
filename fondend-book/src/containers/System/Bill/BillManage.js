import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './BillManage.scss'
import Header from '../../Header/Header';

class BillManage extends Component {

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
                                <input type='text' className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Họ tên:</label>
                                <input type='text' className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Địa chỉ:</label>
                                <input type='text' className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Số điện thoại</label>
                                <input type='text' className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Email</label>
                                <input type='text' className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Ngày đặt</label>
                                <input type='text' className='form-control' />
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
                                    <tr>
                                        <td>1</td>
                                        <td>HD01</td>
                                        <td>KH01</td>
                                        <td>Nguyễn Phương Cường</td>
                                        <td>TP HCM , ấp mới 7 , xã xuân thới thượng</td>
                                        <td>100.000đ</td>
                                        <td>Chưa thanh toán</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>HD01</td>
                                        <td>KH01</td>
                                        <td>Nguyễn Phương Cường</td>
                                        <td>TP HCM , ấp mới 7 , xã xuân thới thượng</td>
                                        <td>100.000đ</td>
                                        <td>Chưa thanh toán</td>
                                    </tr>
                                </table>
                            </div>
                            <div className='bill-detail-table'>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Mã SP</th>
                                            <th>Tên SP</th>
                                            <th>Image</th>
                                            <th>Số Lượng</th>
                                            <th>Tổng tiền</th>
                                        </tr>
                                    </thead>
                                    <tr>
                                        <td>SP01</td>
                                        <td>Bút bi</td>
                                        <td className='img-SP'></td>
                                        <td>5</td>
                                        <td>500.000đ</td>
                                    </tr>
                                    <tr>
                                        <td>SP01</td>
                                        <td>Bút bi</td>
                                        <td className='img-SP'></td>
                                        <td>5</td>
                                        <td>500.000đ</td>
                                    </tr>
                                    <tr>
                                        <td>SP01</td>
                                        <td>Bút bi</td>
                                        <td className='img-SP'></td>
                                        <td>5</td>
                                        <td>500.000đ</td>
                                    </tr>
                                </table>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BillManage);
