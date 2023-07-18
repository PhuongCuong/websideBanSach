import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './BookSlider.scss';
import Slider from "react-slick";
import { handlegetAllBook, handlegetAllBookTL } from '../../../services/bookService';
import { BeatLoader } from 'react-spinners';
import { withRouter } from 'react-router';


const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

var settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 6
};

class BookSlider extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrBook: [],
            arrBookDiscount: [],
            isShowLoding: true,
            arrBookFind: [],
            book: {}

        }
    }



    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.bookoj !== this.props.bookoj) {
            await this.handlegetAllBookTL(this.props.bookoj.theloaiData.keyMap)
            await this.handleaddarrTime()
        }
    }


    handlegetAllBookTL = async (TL) => {
        let res = await handlegetAllBookTL(TL);
        if (res && res.errCode === 0) {
            this.setState({
                arrBook: res.data
            })

            await this.handleloadingdata();

        }

    }

    handlegetBookTL = () => {

    }

    async componentDidMount() {

    }

    handleloadingdata = () => {
        this.setState({
            isShowLoding: false
        })
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


    handleBookInfo = (item) => {
        if (this.props.history) {
            this.props.history.push(`/book/${item.keyMap}`)
        }
    }


    render() {
        let { arrBookDiscount, isShowLoding } = this.state;

        return (
            <div className='book-slider-container'>
                <div className='book-slider-content'>
                    <Slider {...settings}>
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
                                    <div className='book-slider-info'
                                        onClick={() => this.handleBookInfo(item)}
                                    >
                                        <div className='slider-img'
                                            style={{ backgroundImage: `url(${item.image})` }}
                                        ></div>
                                        <div className='silder-ten-sach'>{item.tenSach}</div>
                                        {item.discountData && item.discountData.discount &&
                                            this.convertTimeToMilliseconds(item.discountData.timeDiff) > 0
                                            ?
                                            <>
                                                <div className='product-gia'>
                                                    <span className='gia'>
                                                        {mountDiscount}
                                                    </span>
                                                    <span className='discount'>{`- ${item.discountData.discount * 100}%`}</span>

                                                </div>
                                            </>

                                            :
                                            <div className='product-gia'>
                                                <span className='gia'>{mount}</span>
                                            </div>

                                        }
                                    </div>
                                )
                            })
                        }
                    </Slider>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookSlider));
