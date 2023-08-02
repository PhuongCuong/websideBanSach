import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './BillDetailManage.scss'
import { withRouter } from 'react-router';
import _, { iteratee } from 'lodash';
import { handlegetAllbookbycart } from '../../../services/bookService'
import { handleUpdateCreateBillDetail } from '../../../services/BillService'
import ModalSoLuong from './Modal/ModalSoLuong';
import { toast } from 'react-toastify';


class BillDetaiManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrBillDetail: [],
            maKH: '',
            hoten: '',
            address: '',
            arrBook: [],
            select: 'MA',
            searchText: '',
            arrBookCopy: [],
            selectItem: {},
            number: '',
            isShowEvent: {},
            isShowModal: false,
            arrBillDetailCopy: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location.state !== this.props.location.state) {
            this.setState({
                arrBillDetail: this.props.location.state.arrBillDetail,
                arrBillDetailCopy: [...this.props.location.state.arrBillDetail]
            })
        }
        if (prevState.searchText !== this.state.searchText) {
            let { searchText, arrBook, arrBookCopy } = this.state;
            let filteredBooks = [];
            if (searchText) {
                if (this.state.select === 'MA') {
                    filteredBooks = arrBookCopy.filter((book) =>
                        book.keyMap.toLowerCase().includes(searchText.toLowerCase())
                    );
                } else if (this.state.select === 'Ten') {
                    filteredBooks = arrBookCopy.filter((book) =>
                        book.tenSach.toLowerCase().includes(searchText.toLowerCase())
                    );
                }

                this.setState({
                    arrBook: filteredBooks
                })
            } else {
                this.setState({
                    arrBook: arrBookCopy
                })
            }


        }
    }

    async componentDidMount() {
        let { location } = this.props
        await this.handlegetAllbookbycart()

        if (location && location.state && location.state.arrBillDetail.length > 0) {
            this.setState({
                arrBillDetail: location.state.arrBillDetail
            })
        }
        if (location && location.state && !_.isEmpty(location.state.isShowClick)) {
            this.setState({
                maKH: location.state.isShowClick.UserData.id,
                hoten: location.state.isShowClick.UserData.firstName,
                address: location.state.isShowClick.UserData.address
            })
        }
    }

    handlegetAllbookbycart = async () => {
        let res = await handlegetAllbookbycart('ALL');
        if (res && res.errCode === 0) {
            this.setState({
                arrBook: res.data,
                arrBookCopy: [...res.data]
            })
        }
    }

    handleClose = () => {
        if (this.props.history) {
            this.props.history.push('/system/bill-manage')
        }
    }

    handleOnchangeSelect = (event) => {
        this.setState({
            select: event.target.value
        })
    }

    handleSearchText = (event) => {
        this.setState({
            searchText: event.target.value
        })
    }

    handleDelete = (item) => {
        let { arrBillDetail, arrBook } = this.state;
        let copyarrBook = [...arrBook];
        let copyarrBilldetail = [...arrBillDetail];
        copyarrBilldetail = copyarrBilldetail.filter(detail => detail !== item);
        copyarrBook.forEach((book) => {
            if (book.keyMap === item.bookId) {
                book.soLuong += +item.soLuong;
            }
        })
        this.setState({
            arrBillDetail: copyarrBilldetail,
            arrBook: copyarrBook
        })
    }

    handleEdit = (item) => {
        this.setState({
            selectItem: { ...item }
        })
    }

    handleminus = (selectitem) => {
        let { arrBillDetail, arrBook } = this.state;
        let newCopybook = [...arrBillDetail];
        let copytarrBook = arrBook.map(item => ({ ...item })); // <-- Sao chép tham trị của mảng arrBook

        if (newCopybook && newCopybook.length > 0) {
            newCopybook.forEach((item) => {
                if (item === selectitem) {
                    if (item.soLuong <= 1) {
                        item.soLuong = 1;
                    } else {
                        item.soLuong--;
                        copytarrBook.forEach((bookItem) => {
                            if (bookItem.keyMap === selectitem.bookId) {
                                bookItem.soLuong++;
                                item.thanhTien = bookItem.discountData && bookItem.discountData.discount
                                    ? (+bookItem.gia - (+bookItem.gia * +bookItem.discountData.discount)) * item.soLuong
                                    : +bookItem.gia * item.soLuong;
                            }
                        });
                    }
                }
            });
            this.setState({
                arrBillDetail: newCopybook,
                arrBook: copytarrBook
            });
        }
    };

    handleadds = (selectitem) => {
        let { arrBillDetail, arrBook } = this.state;
        let newCopybook = [...arrBillDetail];
        let copytarrBook = arrBook.map(item => ({ ...item })); // <-- Sao chép tham trị của mảng arrBook

        if (newCopybook && newCopybook.length > 0) {
            newCopybook.forEach((item) => {
                if (item === selectitem) {
                    if (item.soLuong > 0) {
                        item.soLuong++;
                        copytarrBook.forEach((bookItem) => {
                            if (bookItem.keyMap === selectitem.bookId) {
                                if (bookItem.soLuong > 0) {
                                    bookItem.soLuong--;
                                    item.thanhTien = bookItem.discountData && bookItem.discountData.discount
                                        ? (+bookItem.gia - (+bookItem.gia * +bookItem.discountData.discount)) * item.soLuong
                                        : +bookItem.gia * item.soLuong;
                                } else {
                                    alert(`Số lượng trong kho còn lại ${bookItem.soLuong}`);
                                }
                            }
                        });
                        this.setState({
                            arrBillDetail: newCopybook,
                            arrBook: copytarrBook
                        });
                    } else {
                        alert(`Số lượng trong kho còn lại ${item.soLuong}`);
                    }
                }
            });
        }
    };

    handleOnChangeInputs = (event, selectitem) => {
        let { arrBillDetail, arrBook } = this.state;
        let newCopybook = [...arrBillDetail];
        let copytarrBook = arrBook.map(item => ({ ...item }));

        if (newCopybook && newCopybook.length > 0) {
            newCopybook.forEach((item) => {
                if (item.id === selectitem.id) {
                    copytarrBook.forEach((bookItem) => {
                        if (bookItem.keyMap === selectitem.bookId) {
                            if (+event.target.value < +selectitem.soLuong) {
                            }
                            let copyonebook = arrBook.find((book) => book.keyMap === bookItem.keyMap); // Tìm mục sách trong arrBook
                            let soluongbd = copyonebook.soLuong;
                            let diff = selectitem.soLuong - +event.target.value; // Tính sự thay đổi của số lượng trong arrBillDetail

                            if (+event.target.value <= soluongbd) {
                                bookItem.soLuong += diff; // Cập nhật số lượng sách trong arrBook dựa trên sự thay đổi của số lượng trong arrBillDetail
                                item.soLuong = +event.target.value;

                                item.thanhTien = bookItem.discountData && bookItem.discountData.discount
                                    ? (+bookItem.gia - (+bookItem.gia * +bookItem.discountData.discount)) * item.soLuong
                                    : +bookItem.gia * item.soLuong;
                            } else {
                                alert('số lượng trong kho không đủ');
                            }
                        }
                    });
                }
            });
            this.setState({
                arrBillDetail: newCopybook,
                arrBook: copytarrBook
            });
        }
    };



    handleClickrow = (item) => {
        this.setState({
            isShowEvent: item
        })
    }


    handleaddBilldetail = () => {
        if (_.isEmpty(this.state.isShowEvent)) {
            alert('bạn chưa chọn sản phẩm để thêm')
        } else {
            this.setState({
                isShowModal: true
            })
        }
    }

    handleShowModal = () => {
        this.setState({
            isShowModal: !this.state.isShowModal
        })
    }


    handleAddBilldetail = (soluong) => {
        let { arrBillDetail, arrBook, arrBookCopy, isShowEvent } = this.state;
        let { location } = this.props;
        let object = {};
        if (isShowEvent.soLuong < soluong) {
            alert('Số lượng trong kho không đủ!')
        } else {


            // Check if the isShowEvent already exists in arrBillDetail
            const existingItem = arrBillDetail.find((item) => item.bookId === isShowEvent.keyMap);

            if (existingItem) {
                // If the item already exists, update its quantity and total price
                existingItem.soLuong += +soluong;
                existingItem.thanhTien = isShowEvent.discountData && isShowEvent.discountData.discount
                    ? parseFloat(existingItem.soLuong * (+isShowEvent.gia - (+isShowEvent.gia * +isShowEvent.discountData.discount)))
                    : parseFloat(existingItem.soLuong * +isShowEvent.gia);
            } else {
                // If the item does not exist, create a new object and add it to arrBillDetail
                object.BookData = { ...isShowEvent };
                object.bookId = isShowEvent.keyMap;
                object.hoaDonId = location.state.isShowClick.id;
                object.image = isShowEvent.image;
                object.soLuong = soluong;
                object.thanhTien = isShowEvent.discountData && isShowEvent.discountData.discount
                    ? parseFloat(soluong * (+isShowEvent.gia - (+isShowEvent.gia * +isShowEvent.discountData.discount)))
                    : parseFloat(soluong * +isShowEvent.gia);

                arrBillDetail.push(object);
            }

            // Update arrBook to reduce the quantity of the selected item
            arrBook = arrBook.map((item) => {
                if (item === isShowEvent) {
                    item.soLuong -= soluong;
                }
                return item;
            });

            // Update the state after all modifications
            this.setState({
                arrBillDetail: arrBillDetail,
                arrBook: arrBook,
                isShowModal: false
            });
        }

    };


    handleSaveChange = async () => {
        let data = await handleUpdateCreateBillDetail(this.state.arrBillDetail);
        if (data && data.errCode === 0) {
            toast.success('Thay đổi thành công')
        }
    }



    render() {
        let { arrBillDetail, arrBook, selectItem, isShowEvent, isShowModal } = this.state
        return (
            <div className='Bill-detail-manager-container'>
                <div className='Bill-detail-manager-content'>
                    <div className='Bill-detail-manager-header'>
                        <div className='cancel-bill-manager'>
                            <i className="fas fa-hand-point-left"
                                onClick={() => this.handleClose()}
                            ></i>
                            <span>Quay lại trang hóa đơn</span>
                        </div>
                    </div>
                    <div className='Bill-detail-manager-body'>
                        <div className='bill-detail-manager-info'>
                            <div className='bill-info-customer row'>
                                <div className='col-12'>
                                    <label>Mã khách hàng</label>
                                    <input type='text' className='form-control'
                                        value={this.state.maKH}
                                        readOnly

                                    />
                                </div>
                                <div className='col-12'>
                                    <label>Họ tên khách hàng</label>
                                    <input type='text' className='form-control'
                                        value={this.state.hoten}
                                        readOnly

                                    />
                                </div>
                                <div className='col-12'>
                                    <label>Địa chỉ giao hàng</label>
                                    <input type='text' className='form-control'
                                        value={this.state.address}

                                    />
                                </div>
                            </div>

                            <div className='bill-detail-info-product'>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Mã SP</th>
                                            <th>Tên SP</th>
                                            <th>Số Lượng</th>
                                            <th>Tổng tiền</th>
                                            <th>Image</th>
                                            <th>option</th>
                                        </tr>
                                    </thead>
                                    {arrBillDetail && arrBillDetail.length > 0 &&
                                        arrBillDetail.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.bookId}</td>
                                                    <td>{item.BookData.tenSach}</td>
                                                    <td>
                                                        {selectItem.id === item.id ?
                                                            <div className='desgin-input-number'>
                                                                <div className='btn-minus'
                                                                    onClick={() => this.handleminus(item)}
                                                                >
                                                                    <i className="fas fa-minus"></i>
                                                                </div>
                                                                <input type='number'
                                                                    onChange={(event) => this.handleOnChangeInputs(event, item)}
                                                                    value={item.soLuong}
                                                                    className='input-soluong'
                                                                    min={1}>
                                                                </input>
                                                                <div className='btn-adds'
                                                                    onClick={() => this.handleadds(item)}
                                                                >
                                                                    <i className="fas fa-plus"></i>
                                                                </div>
                                                            </div>
                                                            :
                                                            <>
                                                                {item.soLuong}
                                                            </>
                                                        }

                                                    </td>
                                                    <td>{parseFloat(item.thanhTien).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                                    <td className='img-SP'
                                                        style={{ backgroundImage: `url(${item.image})` }}
                                                    ></td>
                                                    <td className='option'>
                                                        <div className='choose'>
                                                            <span className='delete'
                                                                onClick={() => this.handleDelete(item)}
                                                            >
                                                                <i className="fas fa-trash-alt"></i>

                                                            </span>
                                                            <span className='edit'
                                                                onClick={() => this.handleEdit(item)}

                                                            >

                                                                <i className="fas fa-edit"></i>

                                                            </span>

                                                        </div>



                                                    </td>

                                                </tr>
                                            )
                                        })
                                    }
                                </table>
                            </div>
                        </div>
                        <div className='bill-detail-product'>
                            <div className='bill-detail-search row'>
                                <div className='col-4' >
                                    <select className='form-control'
                                        onChange={(event) => this.handleOnchangeSelect(event)}
                                    >
                                        <option value='MA'>Mã sản phẩm</option>
                                        <option value='Ten'>Tên sản phẩm</option>
                                    </select>
                                </div>
                                <div className='text-search col-8'>
                                    <div className='in-text-search form-control'>
                                        <i className="fas fa-search"></i>
                                        <input type='text' placeholder='Tìm kiếm'
                                            value={this.state.searchText}
                                            onChange={(event) => this.handleSearchText(event)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='bill-detail-list-product'>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Mã SP</th>
                                            <th>Tên SP</th>
                                            <th>Số Lượng</th>
                                            <th>Đơn giá</th>
                                            <th>Image</th>
                                        </tr>
                                    </thead>
                                    {arrBook && arrBook.length > 0 &&
                                        arrBook.map((item, index) => {
                                            return (
                                                <tr
                                                    className={isShowEvent === item ? 'active' : ''}
                                                    key={index}
                                                    onClick={() => this.handleClickrow(item)}
                                                >
                                                    <td>{item.keyMap}</td>
                                                    <td>{item.tenSach}</td>
                                                    <td>
                                                        {item.soLuong}
                                                    </td>
                                                    <td>
                                                        {item.discountData && item.discountData.discount
                                                            ?
                                                            parseFloat(item.gia - (item.gia * item.discountData.discount)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                                                            :
                                                            parseFloat(item.gia).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })

                                                        }
                                                    </td>
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
                        <div className='bill-detail-btn'>
                            <div className='bill-detail-choose'>
                                <button className='btn-add-product'
                                    onClick={() => this.handleaddBilldetail()}
                                >
                                    <i className="fas fa-plus-circle"></i>
                                    Thêm sản phẩm
                                </button>
                                <button className='btn-save-change'
                                    onClick={() => this.handleSaveChange()}
                                >
                                    <i className="fas fa-save"></i>
                                    Lưu thay đổi
                                </button>
                            </div>
                            <ModalSoLuong
                                isShowModal={this.state.isShowModal}
                                handleShowModal={this.handleShowModal}
                                handleAddBilldetail={this.handleAddBilldetail}
                            />
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

export default connect(mapStateToProps, mapDispatchToProps)(BillDetaiManage);
