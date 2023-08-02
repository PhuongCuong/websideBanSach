import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Cart.scss'
import HomeHeader from '../Header/HomeHeader';
import * as actions from "../../../store/actions"
import { iteratee } from 'lodash';
import CartBill from './CartBill';
import { handlegetAllbookbycart } from '../../../services/bookService'

class Cart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            soluong: [],
            checkboxes: [],
            arrbook: [],
            arrBookDiscount: []

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    async componentDidMount() {
        await this.handlegetAllbook();
        await this.handleaddarrTime();


    }

    handlegetAllbook = async () => {
        try {
            let arrbook = await handlegetAllbookbycart('ALL');
            if (arrbook && arrbook.errCode === 0) {
                this.setState({
                    arrBook: arrbook.data
                })

            }
        } catch (e) {
            console.log(e)
        }

    }


    handleDelete = (book) => {
        let { copybook } = this.props;
        let newCopybook = [...copybook]
        if (newCopybook && newCopybook.length > 0) {
            newCopybook = newCopybook.filter(item => item.keyMap !== book.keyMap)
        }
        this.props.updatedCopybook(newCopybook)
    }

    handleaddarrTime = () => {
        let { arrBook, arrBookDiscount } = this.state;
        let copyarrBook = { ...arrBook }
        let arr = [];
        if (arrBook && arrBook.length > 0) {
            arrBook.forEach((item) => {
                let copytitem = { ...item };
                if (copytitem && copytitem.discountData) {
                    let discountData = { ...copytitem.discountData }
                    let timeDiff = '';
                    if (discountData.ngayBD <= new Date().getTime()) {
                        timeDiff = discountData.ngayKT - new Date().getTime();
                    }

                    var seconds = Math.floor(timeDiff / 1000) % 60;
                    var minutes = Math.floor(timeDiff / 1000 / 60) % 60;
                    var hours = Math.floor(timeDiff / 1000 / 60 / 60);
                    let formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                    discountData.timeDiff = formattedTime;
                    copytitem.discountData = discountData;
                    item = copytitem;
                }
                arr.push(item);
            })
            if (arr && arr.length > 0) {
                this.setState({
                    arrBookDiscount: arr,
                })
            }
        }
    }

    handleBuycart = () => {
        if (this.props.history) {
            this.props.history.push({
                pathname: '/home',
                state: this.state.arrBookDiscount
            })
        }
    }

    handleInfoBook = async (item) => {
        if (this.props.history) {
            this.props.history.push(`/book/${item.keyMap}`)
        }
        await this.props.fetchallBookStart(item.keyMap);

    }


    handleCheckboxChange = (event, selectitem) => {
        const { checked } = event.target;
        const { checkboxes } = this.state;

        if (checked) {
            // Nếu checkbox được chọn, thêm giá trị vào mảng checkboxes
            this.setState({
                checkboxes: [...checkboxes, selectitem]
            });
        } else {
            // Nếu checkbox được bỏ chọn, loại bỏ giá trị khỏi mảng checkboxes
            this.setState({
                checkboxes: checkboxes.filter(item => item !== selectitem)
            });
        }
    }

    handleCheckAll = (event) => {
        let { checked } = event.target;
        let { copybook } = this.props

        if (checked) {
            this.setState({
                checkboxes: [...copybook]
            })
        } else {
            this.setState({
                checkboxes: []
            })
        }
    }


    handleThanhToan = () => {
        if (this.props.history) {
            this.props.history.push({
                pathname: '/cart-bill',
                state: { checkboxes: this.state.checkboxes }
            })
        }
    }

    handleminus = (selectitem) => {
        let { copybook } = this.props;
        let newCopybook = [...copybook]
        if (newCopybook && newCopybook.length > 0) {
            newCopybook.map((item) => {
                if (item === selectitem) {
                    if (item.soluongmua <= 1) {
                        item.soluongmua = 1;
                    }
                    else {
                        item.soluongmua--;
                        item.soLuong++;
                    }
                    this.props.updatedCopybook(newCopybook)

                }
            })
        }
    }

    handleadds = (selectitem) => {
        let { copybook } = this.props;
        let newCopybook = [...copybook]
        if (newCopybook && newCopybook.length > 0) {
            newCopybook.map((item) => {
                if (item === selectitem) {
                    if (item.soLuong > 0) {
                        item.soluongmua++;
                        item.soLuong--;
                        this.props.updatedCopybook(newCopybook)

                    } else {
                        alert(`Số lượng trong kho còn lại ${item.soLuong}`)
                    }
                }
            })
        }

    }

    handleOnChangeInputs = (event, selectitem) => {
        let { copybook } = this.props;
        let newCopybook = [...copybook]
        if (newCopybook && newCopybook.length > 0) {
            newCopybook.map(async (item) => {
                if (item === selectitem) {
                    if (item.soLuong > 0) {
                        if (item.soluongmua + item.soLuong < +event.target.value) {
                            alert(`Số lượng trong kho còn lại ${item.soLuong}`)
                        } else {
                            item.soLuong -= (+event.target.value - item.soluongmua);
                            item.soluongmua = +event.target.value;
                        }
                        await this.props.updatedCopybook(newCopybook)

                    } else {
                        alert(`Số lượng trong kho còn lại ${item.soLuong}`)
                    }

                }
            })
        }

    }

    render() {
        let { checkboxes, item } = this.state
        let { copybook, bookInfo } = this.props
        let tongtien = '';
        return (
            <div className='cart-container'>
                <div className='cart-content'>
                    <div className='cart-header'>
                        <HomeHeader />
                    </div>
                    <div className='cart-body'>
                        <div className='cart-title'>Giỏ hàng:
                            <span className='text-title'>(1 sản phẩm)</span>
                        </div>
                        <div className='choose-all'>
                            <input type='checkbox'
                                onChange={(event) => this.handleCheckAll(event)}
                                checked={checkboxes.length === copybook.length}
                            />
                            <div className='text-all-product'>Chọn tất cả:
                                <span className='text-sl-product'>(1 sản phẩm)</span>
                            </div>
                            <div className='text-soluong'>Số lượng</div>
                            <div className='text-gia'>Thành tiền</div>
                        </div>
                        {copybook && copybook.length > 0
                            ? copybook.map((item, index) => {
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
                                        <input type='checkbox'
                                            value={item}
                                            checked={checkboxes.includes(item)}
                                            onChange={(event) => this.handleCheckboxChange(event, item)}

                                        />
                                        <div className='img-product' style={{ backgroundImage: `url(${item.image})` }}
                                            onClick={() => this.handleInfoBook(item)}

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
                                            <div className='btn-minus'
                                                onClick={() => this.handleminus(item)}
                                            >
                                                <i className="fas fa-minus"></i>
                                            </div>
                                            <input type='number'
                                                onChange={(event) => this.handleOnChangeInputs(event, item)}
                                                value={item.soluongmua}
                                                className='input-soluong'
                                                min={1}>
                                            </input>
                                            <div className='btn-adds'
                                                onClick={() => this.handleadds(item)}
                                            >
                                                <i className="fas fa-plus"></i>
                                            </div>
                                        </div>
                                        {item.discountData && item.discountData.discount
                                            ?
                                            <>
                                                <div className='thanh-tien'>{thanhtienDiscount}</div>
                                            </>
                                            :
                                            <div className='thanh-tien'>{thanhtien}</div>

                                        }
                                        <div className='delete-product-cart'
                                            onClick={() => this.handleDelete(item)}
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </div>
                                    </div>
                                )
                            })

                            :
                            <div className='cart-is-null'>
                                <div className='text-center-cart'>
                                    <div className='img-center-cart'></div>
                                    <div className='text-cart-isnull'>Chưa có sản phẩm trong giỏ hàng của bạn.</div>
                                    <button className='btn-muasam'
                                        onClick={() => this.handleBuycart()}
                                    >Mua sắm ngay</button>
                                </div>
                            </div>
                        }
                        {copybook && copybook.length > 0
                            ?
                            <div className='cart-bill'>
                                <div className='toltal-product'>

                                    <div className='text-toltal'>Tổng tiền thanh toán:</div>
                                    {checkboxes && checkboxes.length > 0
                                        &&
                                        checkboxes.map((item, index) => {
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
                                        ?
                                        <div className='toltal-mount'>{parseFloat(tongtien).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                        :
                                        <></>

                                    }
                                </div>
                                <div className='toltal-bill'>
                                    {checkboxes && checkboxes.length > 0
                                        ?
                                        <button className='btn-thanhtoan'
                                            onClick={() => this.handleThanhToan()}
                                        >Thanh Toán</button>
                                        :
                                        <button className='btn-not-thanhtoan'
                                            onClick={() => this.handleThanhToan()}
                                            disabled='true'
                                        >Thanh Toán</button>
                                    }

                                </div>
                            </div>
                            :
                            <></>
                        }
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
        updatedCopybook: (copybook) => dispatch(actions.updatedCopybook(copybook)),
        fetchallBookStart: (maSach) => dispatch(actions.fetchallBookStart(maSach)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
