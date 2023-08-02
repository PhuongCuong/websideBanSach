import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './HomeProduct.scss'
import { Scrollbars } from 'react-custom-scrollbars';
import { handlegetAllBook, handlegetAllbookbycart } from '../../../services/bookService'
import { BeatLoader } from "react-spinners";
import { withRouter } from 'react-router';
import * as actions from "../../../store/actions"


const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

class HomeProduct extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrBook: [],
            isShowLoding: true,
            arrBookDiscount: []
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.arrBook !== this.props.arrBook) {
            this.setState({
                arrBook: this.props.arrBook
            })
        }
        if (prevState.arrBook !== this.state.arrBook) {

            await this.handleaddarrTime();

        }
    }

    async componentDidMount() {
        await this.handleSetarrBook();
        // await this.handleaddarrTime();

    }

    handleSetarrBook = () => {
        if (this.props.arrBook && this.props.arrBook.length > 0) {
            this.setState({
                arrBook: this.props.arrBook
            })
        }

    }

    handleloadingdata = () => {
        this.setState({
            isShowLoding: false
        })
    }


    handlegetAllbook = async () => {
        try {
            let arrbook = await handlegetAllbookbycart('ALL');
            if (arrbook && arrbook.errCode === 0) {
                this.setState({
                    arrBook: arrbook.data
                })

                await this.handleloadingdata();
            }
        } catch (e) {
            console.log(e)
        }

    }


    handleBookInfo = async (item) => {
        if (this.props.history) {
            this.props.history.push(`/book/${item.keyMap}`)
            await this.props.fetchallBookStart(item.keyMap);

        }
    }

    handleaddarrTime = () => {
        let { arrBookDiscount, arrBook } = this.state;
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
                    arrBookDiscount: arr
                })
            }
        }
    }

    convertTimeToMilliseconds = (time) => {
        const [hours, minutes, seconds] = time.split(':').map(Number);
        const totalMilliseconds = hours * 3600000 + minutes * 60000 + seconds * 1000;
        return totalMilliseconds;
    };

    render() {
        let { isShowLoding, arrBookDiscount, arrBook } = this.state;
        return (
            <div className='homeproduct-container'>
                <div className='homeproduct-content'>
                    {arrBookDiscount && arrBookDiscount.length > 0
                        && arrBookDiscount.map((item, index) => {
                            let mount = '';
                            let mountDiscount = '';
                            if (item.gia) {
                                mount = parseFloat(item.gia).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                                if (item.discountData && item.discountData.discount) {
                                    mountDiscount = parseFloat(item.gia - (item.discountData.discount * item.gia)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

                                }

                            }
                            return (
                                <div className='book-info' key={index}
                                    onClick={() => this.handleBookInfo(item)}
                                >
                                    <div className='book-info-img' style={{ backgroundImage: `url(${item.image})` }}>
                                    </div>
                                    <div className='book-info-name'>
                                        {item.tenSach}
                                    </div>
                                    {item.discountData && item.discountData.discount &&
                                        this.convertTimeToMilliseconds(item.discountData.timeDiff) > 0
                                        ?
                                        <div className='book-info-gia'>
                                            <span className='book-info-gia-discount'>Giá:{mountDiscount}</span>
                                            <span className='book-info-gia-bd'>{mount}</span>
                                        </div>
                                        :
                                        <div className='book-info-gia-not-discount'>
                                            Giá:{mount}
                                        </div>
                                    }


                                    {item.discountData && item.discountData.discount &&
                                        this.convertTimeToMilliseconds(item.discountData.timeDiff) > 0
                                        ?
                                        <div className='book-info-discount'>
                                            {`-${item.discountData.discount * 100}%`}
                                            <i className="fas fa-tag"></i></div>
                                        :
                                        <div></div>
                                    }
                                </div>
                            )
                        })
                    }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeProduct));
