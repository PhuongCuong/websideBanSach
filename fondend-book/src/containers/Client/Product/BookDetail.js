import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './BookDetail.scss';
import { withRouter } from 'react-router';
import { handlegetAllBook } from '../../../services/bookService'
import HomeHeader from '../Header/HomeHeader';
import BookinfoCart from './BookinfoCart';
import BookDetailCart from './BookDetailCart';
import BookSlider from './BookSlider';
import { BeatLoader } from 'react-spinners';
import * as actions from "../../../store/actions"

class BookDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            keyMap: '',
            bookoj: {},
            isShowfull: false,
            soluong: ''
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.keyMap !== this.props.match.params.keyMap) {
            let keyMap = this.props.match.params.keyMap;
            let res = await handlegetAllBook(keyMap);
            if (res && res.errCode === 0) {
                this.setState({
                    keyMap: keyMap,
                    bookoj: res.data
                })
                await this.props.fetchallBookStart(this.props.match.params.keyMap);
            }
        }
    }

    loadDatafromsoluong = (data) => {
        this.setState({
            soluong: data
        })
    }



    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.keyMap) {
            let keyMap = this.props.match.params.keyMap;
            let res = await handlegetAllBook(keyMap);
            if (res && res.errCode === 0) {
                this.setState({
                    keyMap: keyMap,
                    bookoj: res.data
                })

            }

        }
    }

    handleShowfull = () => {
        this.setState({
            isShowfull: !this.state.isShowfull
        })
    }


    render() {
        let { isShowLoding, bookoj, isShowfull, soluong } = this.state;
        return (
            <div className='book-detail-container'>
                <div className='book-detail-content'>
                    <div className='book-detail-header'>
                        <HomeHeader />
                    </div>
                    <div className='book-detail-body'>
                        <div className='book-detail-info'>
                            <div className='book-detail-info-left'>
                                <BookinfoCart
                                    bookoj={this.state.bookoj}
                                    soluong={this.state.soluong}

                                />
                            </div>
                            <div className='book-detail-info-right'>
                                <BookDetailCart
                                    bookoj={this.state.bookoj}
                                    loadDatafromsoluong={this.loadDatafromsoluong}
                                />
                            </div>
                        </div>
                        <div className='book-relate'>
                            <div className='relate-title'>Sản phẩm giới thiệu</div>
                            <div className='relate-slider'>
                                <BookSlider
                                    bookoj={this.state.bookoj}

                                />
                            </div>
                        </div>
                        <div className={isShowfull === false ? 'book-show-info' : 'book-show-info show-full-parent'}>
                            <div className='book-show-info-title'>Thông tin sản phẩm</div>

                            <div className={isShowfull === false ? 'book-show-info-body' : 'book-show-info-body show-full'}>
                                {bookoj && bookoj.BookInfoData && bookoj.BookInfoData.descriptionHTML
                                    &&
                                    <div className='text-infos' dangerouslySetInnerHTML={{ __html: bookoj.BookInfoData.descriptionHTML }}></div>
                                }
                            </div>

                            <div className='btn-show-info'>
                                {isShowfull === false
                                    ?
                                    <button className='btn-xemthem'
                                        onClick={() => this.handleShowfull()}
                                    >Xem thêm</button>
                                    :
                                    <button className='btn-thugon'
                                        onClick={() => this.handleShowfull()}
                                    >Thu gọn</button>
                                }

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
        bookInfo: state.book.bookInfo,
        copybook: state.book.copybook,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchallBookStart: (maSach) => dispatch(actions.fetchallBookStart(maSach)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);
