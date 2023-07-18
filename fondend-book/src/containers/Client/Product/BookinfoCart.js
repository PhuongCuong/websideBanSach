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

    }

    componentDidMount() {
        this.setState({
            newCopybook: [...this.props.copybook]
        })
    }

    handleThemCart = async () => {
        let { bookInfo, copybook } = this.props;
        let { newCopybook } = this.state
        console.log('check newbook', newCopybook)
        let isExist = false;

        if (newCopybook && newCopybook.length > 0) {
            newCopybook.map((item, index) => {
                if (item.keyMap === bookInfo.keyMap) {
                    if (this.props.soluong <= item.soLuong
                    ) {
                        item.soluongmua += this.props.soluong;
                        item.soLuong -= this.props.soluong;
                        isExist = true;
                        console.log('check item click', item)
                    } else {
                        alert(`số lượng trong kho còn lại:${item.soLuong} quyển`)
                    }
                }
            });

            if (!isExist) {
                if (this.props.soluong <= bookInfo.soLuong) {
                    bookInfo.soLuong -= this.props.soluong
                    let object = {
                        ...bookInfo,
                        'soluongmua': this.props.soluong
                    };

                    newCopybook.push(object);
                }
                else {
                    alert(`số lượng trong kho còn lại:${bookInfo.soLuong} quyển`)

                }
            }

            await this.props.updatedCopybook(newCopybook);

        } else {
            if (this.props.soluong <= bookInfo.soLuong) {
                bookInfo.soLuong -= this.props.soluong
                let object = {
                    ...bookInfo,
                    'soluongmua': this.props.soluong
                };

                newCopybook.push(object);
            }
            else {
                alert(`số lượng trong kho còn lại:${bookInfo.soLuong} quyển`)
            }

            await this.props.updatedCopybook(newCopybook);

        }


    }

    handleMuangay = async () => {
        let { bookInfo, copybook } = this.props;
        let newCopybook = [...copybook];
        let isExist = false;

        if (newCopybook && newCopybook.length > 0) {
            newCopybook.map((item, index) => {
                if (newCopybook[index].keyMap === bookInfo.keyMap) {
                    if (this.props.soluong <= newCopybook[index].soLuong
                    ) {
                        newCopybook[index].soluongmua += 1;
                        newCopybook[index].soLuong -= 1;
                        isExist = true;
                    } else {
                        alert(`số lượng trong kho còn lại:${bookInfo.soLuong} quyển`)
                    }
                }
            });

            if (!isExist) {
                if (this.props.soluong <= bookInfo.soLuong) {
                    bookInfo.soLuong -= this.props.soluong
                    let object = {
                        ...bookInfo,
                        'soluongmua': 1
                    };

                    newCopybook.push(object);
                }
                else {
                    alert(`số lượng trong kho còn lại:${bookInfo.soLuong} quyển`)

                }
            }

            await this.props.updatedCopybook(newCopybook);

        } else {
            if (this.props.soluong <= bookInfo.soLuong) {
                bookInfo.soLuong -= this.props.soluong
                let object = {
                    ...bookInfo,
                    'soluongmua': 1
                };

                newCopybook.push(object);
            }
            else {
                alert(`số lượng trong kho còn lại:${bookInfo.soLuong} quyển`)
            }

            await this.props.updatedCopybook(newCopybook);

        }

    }


    render() {
        let { bookoj, copybook } = this.props;
        let { newCopybook } = this.state;
        console.log('check newbook', newCopybook)

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
