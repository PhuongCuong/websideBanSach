import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ListBill.scss'
import HomeHeader from '../Header/HomeHeader';
import ListChooseaction from '../Header/ListChooseaction';
import { hanlegetAllBillbyuserId, hanlegetAllBilldetail } from '../../../services/BillService'
import moment from 'moment';

class ListBill extends Component {

    constructor(props) {
        super(props)
        this.state = {
            clickshow: 'allbill',
            arrBill: [],
            arrBillcopy: [],
            textSearch: '',
            arrBookDetailbill: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.textSearch !== this.state.textSearch) {
            let filteredBooks = this.state.arrBillcopy.filter((item) =>
                item.id.toString().toLowerCase().includes(this.state.textSearch.toLowerCase())
            );
            this.setState({
                arrBill: filteredBooks
            })
        }
    }

    async componentDidMount() {
        let userId = this.props.userInfo && this.props.userInfo.data ?
            this.props.userInfo.data.id : '';
        if (userId) {
            let data = await hanlegetAllBillbyuserId(userId);
            if (data && data.errCode === 0) {
                this.setState({
                    arrBill: data.data,
                    arrBillcopy: data.data
                })
            }
        }
    }

    handleClickfilter = (id) => {
        this.setState({
            clickshow: id
        })
        if (id === 'allbill') {
            this.setState({
                arrBill: this.state.arrBillcopy
            })
        } else if (id === 'paid') {
            this.setState({
                arrBill: this.state.arrBillcopy.filter((item) => item.statusData.keyMap === 'S2')
            })
        } else if (id === 'unpaid') {
            this.setState({
                arrBill: this.state.arrBillcopy.filter((item) => item.statusData.keyMap === 'S1')

            })
        }
    }

    handleOnChangeInput = (event) => {
        this.setState({
            textSearch: event.target.value
        })
    }

    handleShowDetail = async (item) => {
        let data = await hanlegetAllBilldetail(item.id);
        if (data && data.errCode === 0) {
            this.setState({
                arrBookDetailbill: data.data
            })
        }
    }

    handleCancelAllbill = () => {
        this.setState({
            arrBookDetailbill: []
        })
    }


    render() {
        let { clickshow, arrBill, arrBookDetailbill } = this.state;
        console.log('check state', this.state)
        return (
            <div className='list-bill-container'>
                <div className='list-bill-content'>
                    <div className='list-bill-header'>
                        <HomeHeader />
                    </div>
                    <div className='list-bill-body'>
                        <div className='list-bill-in-body'>
                            <div className='list-bill-left'>
                                <ListChooseaction />
                            </div>
                            <div className='list-bill-right'>
                                <div className='list-bill-title'>Đơn hàng của tôi</div>
                                <div className='list-bill-filter'>
                                    <div className={clickshow === 'allbill' ? 'list-bill-item active' : 'list-bill-item'}
                                        onClick={() => this.handleClickfilter('allbill')}
                                    >
                                        Tất cả hóa đơn
                                    </div>
                                    <div className={clickshow === 'paid' ? 'list-bill-item active' : 'list-bill-item'}
                                        onClick={() => this.handleClickfilter('paid')}

                                    >
                                        Hóa đơn đã thanh toán
                                    </div>
                                    <div className={clickshow === 'unpaid' ? 'list-bill-item active' : 'list-bill-item'}
                                        onClick={() => this.handleClickfilter('unpaid')}

                                    >
                                        Hóa đơn chưa thanh toán
                                    </div>
                                </div>
                                <div className='list-bill-find'>
                                    <div className='find-icon'>
                                        <i className="fas fa-search"></i>
                                    </div>
                                    <div className='find-input'>
                                        <input type='text' placeholder='tìm kiếm hóa đơn theo mã'
                                            value={this.state.textSearch}
                                            onChange={(event) => this.handleOnChangeInput(event)}
                                        />
                                    </div>
                                    <div className='btn-text-find'>Tìm đơn hàng</div>
                                </div>
                                <div className='list-bill-child'>
                                    {arrBill && arrBill.length > 0 ? (
                                        arrBookDetailbill && arrBookDetailbill.length > 0 ? (
                                            <div className='show-bill-detail'>
                                                <div className='Cancel-show-all-bill'
                                                    onClick={() => this.handleCancelAllbill()}
                                                >
                                                    <span>
                                                        <i className="far fa-arrow-alt-circle-left"></i>
                                                    </span>
                                                </div>
                                                <div className='list-bill-show'>
                                                    <div className='table-list-bill'>
                                                        <table className='table'>
                                                            <thead>
                                                                <tr>
                                                                    <th>Mã sản phẩm</th>
                                                                    <th>Tên sản phẩm</th>
                                                                    <th>Số lượng</th>
                                                                    <th>Thành tiền</th>
                                                                    <th>image</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {arrBookDetailbill.map((item, index) => (
                                                                    <tr key={index}>
                                                                        <td>{item.BookData.keyMap}</td>
                                                                        <td>{item.BookData.tenSach}</td>
                                                                        <td>{item.soLuong}</td>
                                                                        <td>
                                                                            {parseFloat(item.thanhTien).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                                        </td>
                                                                        <td className='image-book'
                                                                            style={{ backgroundImage: `url(${item.BookData.image})` }}
                                                                        >

                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className='list-bill-show'>
                                                <div className='table-list-bill'>
                                                    <table className='table'>
                                                        <thead>
                                                            <tr>
                                                                <th>Mã hóa đơn</th>
                                                                <th>Địa chỉ nhận hàng</th>
                                                                <th>Số điện thoại</th>
                                                                <th>Tổng tiền</th>
                                                                <th>Trạng thái</th>
                                                                <th>ngày đặt</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {arrBill.map((item, index) => (
                                                                <tr key={index}>
                                                                    <td>{item.id}</td>
                                                                    <td>{item.UserData.address}</td>
                                                                    <td>{item.UserData.phoneNumber}</td>
                                                                    <td>
                                                                        {parseFloat(item.tongTien).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                                    </td>
                                                                    <td>{moment(item.createdAt).format('HH:mm:ss DD/MM/YYYY')}</td>
                                                                    <td>{item.statusData.value}</td>
                                                                    <td className='show-detail' onClick={() => this.handleShowDetail(item)}>
                                                                        Xem chi tiết
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        )
                                    ) : (
                                        <div className='list-bill-unbill'>
                                            <div className='list-bill-img'></div>
                                            <p>Chưa có đơn hàng</p>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div >
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListBill);
