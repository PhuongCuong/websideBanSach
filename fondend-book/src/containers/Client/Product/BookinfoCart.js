import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './BookinfoCart.scss';
import * as actions from "../../../store/actions"
import { withRouter } from 'react-router';


class BookinfoCart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            bookInfo: {},
            newCopybook: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.copybook !== this.props.copybook) {
            this.setState({
                newCopybook: [...this.props.copybook]
            })
        }
    }

    componentDidMount() {
        this.setState({
            newCopybook: [...this.props.copybook]
        })
    }

    handleThemCart = async () => {
        const { bookInfo, copybook, soluong, updatedCopybook } = this.props;
        const { newCopybook } = this.state;
        let isExist = false;
        let foundItem = false;

        if (newCopybook && newCopybook.length > 0) {
            for (let i = 0; i < newCopybook.length; i++) {
                const item = newCopybook[i];
                if (item.keyMap === bookInfo.keyMap) {
                    if (soluong <= item.soLuong) {
                        item.soluongmua += soluong;
                        item.soLuong -= soluong;
                        isExist = true;
                        foundItem = true;
                    } else {
                        alert(`Số lượng trong kho còn lại: ${item.soLuong} quyển`);
                        return;
                    }
                }
            }

            if (!foundItem) {
                if (soluong <= bookInfo.soLuong) {
                    bookInfo.soLuong -= soluong;
                    const object = {
                        ...bookInfo, // Tạo bản sao của bookInfo
                        soluongmua: soluong
                    };
                    newCopybook.push(object);
                    await updatedCopybook(newCopybook);
                } else {
                    alert(`Số lượng trong kho còn lại: ${bookInfo.soLuong} quyển`);
                }
            }
        } else {
            if (soluong <= bookInfo.soLuong) {
                bookInfo.soLuong -= soluong;
                const object = {
                    ...bookInfo, // Tạo bản sao của bookInfo
                    soluongmua: soluong
                };
                newCopybook.push(object);
                await updatedCopybook(newCopybook);
            } else {
                alert(`Số lượng trong kho còn lại: ${bookInfo.soLuong} quyển`);
            }
        }
    }


    handleMuangay = async () => {
        const { bookInfo, copybook, soluong, updatedCopybook } = this.props;
        let newCopybook = [...copybook];
        let isExist = false;

        if (newCopybook && newCopybook.length > 0) {
            for (let index = 0; index < newCopybook.length; index++) {
                const item = newCopybook[index];
                if (item.keyMap === bookInfo.keyMap) {
                    if (soluong <= item.soLuong) {
                        newCopybook[index].soluongmua += 1;
                        newCopybook[index].soLuong -= 1;
                        isExist = true;
                    } else {
                        alert(`Số lượng trong kho còn lại: ${item.soLuong} quyển`);
                        return;
                    }
                }
            }

            if (!isExist) {
                if (soluong <= bookInfo.soLuong) {
                    bookInfo.soLuong -= soluong;
                    const object = {
                        ...bookInfo,
                        soluongmua: 1
                    };
                    newCopybook.push(object);
                    await updatedCopybook(newCopybook);
                } else {
                    alert(`Số lượng trong kho còn lại: ${bookInfo.soLuong} quyển`);
                }
            }
        } else {
            if (soluong <= bookInfo.soLuong) {
                bookInfo.soLuong -= soluong;
                const object = {
                    ...bookInfo,
                    soluongmua: 1
                };
                newCopybook.push(object);
                await updatedCopybook(newCopybook);
            } else {
                alert(`Số lượng trong kho còn lại: ${bookInfo.soLuong} quyển`);
            }
        }
    }



    render() {
        let { bookoj, copybook } = this.props;
        let { newCopybook } = this.state;

        return (
            <div className='book-info-cart-container'>
                <div className='book-info-cart-content'>
                    {bookoj && bookoj.image
                        ?
                        <div className='book-info-cart-image'
                            style={{ backgroundImage: `url(${bookoj.image})` }}
                        >

                        </div>
                        :
                        <div className='book-info-cart-image'>

                        </div>
                    }

                    <div className='book-info-cart-btn'>
                        <button className='btn-add-cart'
                            onClick={() => this.handleThemCart()}
                        >
                            <i className="fas fa-shopping-cart"></i>
                            Thêm vào giỏ hàng
                        </button>
                        <button className='btn-buy'
                            onClick={() => this.handleMuangay()}
                        >Mua ngay</button>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        bookInfo: state.book.bookInfo,
        copybook: state.book.copybook,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updatedCopybook: (copybook) => dispatch(actions.updatedCopybook(copybook)),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookinfoCart));
