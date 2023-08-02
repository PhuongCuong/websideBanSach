import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './HomeBody.scss'
import { Scrollbars } from 'react-custom-scrollbars';
import { handlegetAllbookbycart, handlegetAllTL, handlegetAllBookTL } from '../../../services/bookService'
import { BeatLoader } from "react-spinners";
import { withRouter } from 'react-router';
import * as actions from "../../../store/actions"
import HomeProduct from './HomeProduct';
import BookSlider from '../Product/BookSlider';
import Slider from 'react-slick';
import SliderManager from '../SliderManager';


const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,

};

class HomeBody extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrBook: [],
            isShowLoding: true,
            arrBookDiscount: [],
            arrTL: [],
            arrBookTL: [],
            selectTL: false,
            currentIndex: 0,
            infoarrDiscount: []
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.arrBookDiscount !== this.state.arrBookDiscount) {
            let arr = [];
            let { arrBookDiscount } = this.state;
            if (arrBookDiscount && arrBookDiscount.length > 0) {
                arrBookDiscount.map(item => {
                    let object = { ...item };
                    if (object.discountData) {
                        item = object;
                        arr.push(item)
                    }
                })
            }
            this.setState({
                arrBookTL: this.state.arrBookDiscount.filter(item =>
                    item.theloaiData.keyMap === 'TL1'
                ),
                infoarrDiscount: arr
            })
        }

    }

    async componentDidMount() {
        await this.handlegetAllbook();
        await this.handlegetAllTL();
        await this.handleaddarrTime();

    }

    handleloadingdata = () => {
        this.setState({
            isShowLoding: false
        })
    }

    handlegetAllBookTL = async (TL) => {
        let arr = await handlegetAllBookTL(TL);
        if (arr && arr.errCode === 0) {
            this.setState({
                arrBookTL: arr.data
            })
        }
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

    handleShowTL = async (book) => {
        let { arrBookDiscount, arrTL } = this.state;
        let arr = [...arrBookDiscount];
        let updatedArrTL = arrTL.map(item => {
            if (item.keyMap === book.keyMap) {
                return { ...item, select: true };
            } else {
                return { ...item, select: false };
            }
        });
        if (arr && arr.length > 0) {
            arr = arr.filter(item =>
                item.theloaiData.keyMap === book.keyMap
            );
            this.setState({
                arrBookTL: arr,
                arrTL: updatedArrTL,
            });
        } else {
            arr = arr.filter(item =>
                item.theloaiData.keyMap === 'TL1'
            );
            this.setState({
                arrBookTL: arr,
                arrTL: updatedArrTL,
            });
        }

    };


    handlegetAllTL = async () => {
        try {
            let arrbook = await handlegetAllTL('ALL');
            if (arrbook && arrbook.errCode === 0) {
                let arr = arrbook.data.map((item, index) => {
                    return { ...item, select: index === 0 }
                })
                this.setState({
                    arrTL: arr
                })

            }
        } catch (e) {
            console.log(e)
        }

    }




    handleaddarrTime = () => {
        let { arrBook, arrBookDiscount, arrBookTL, selectTL } = this.state;
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

    convertTimeToMilliseconds = (time) => {
        const [hours, minutes, seconds] = time.split(':').map(Number);
        const totalMilliseconds = hours * 3600000 + minutes * 60000 + seconds * 1000;
        return totalMilliseconds;
    };

    handleShowMore = (books) => {
        if (this.props.history) {
            this.props.history.push({
                pathname: '/show-more-books',
                state: books
            })
        }
    }

    render() {
        let { arrTL, infoarrDiscount } = this.state;
        return (
            <div className='homebody-container'>
                <div className='homebody-content'>
                    <div className='trending-buy'>
                        <div className='trending-title'>Sản phẩm theo xu hướng</div>
                        <div className='trending-info'>
                            <HomeProduct
                                arrBook={this.state.arrBookDiscount}
                            />
                        </div>
                        <div className='show-more'>
                            <button className='btn-show-more'
                                onClick={() => this.handleShowMore(this.state.arrBookDiscount)}
                            >Xem thêm</button>
                        </div>
                    </div>
                    <div className='product-category'>
                        <div className='product-category-title'>Danh mục sản phẩm</div>
                        <div className='product-category-info'>
                            {arrTL && arrTL.length > 0
                                && arrTL.map((item, index) => {
                                    return (
                                        <>
                                            {item.select === false
                                                ?
                                                <div className='product-category-show' key={index}
                                                    onClick={() => this.handleShowTL(item)}
                                                >
                                                    <span>{item.theLoai}</span>
                                                </div>
                                                :
                                                <div className='product-category-show action' key={index}
                                                    onClick={() => this.handleShowTL(item)}
                                                >
                                                    <span>{item.theLoai}</span>
                                                </div>
                                            }
                                        </>


                                    )
                                })
                            }
                        </div>
                        <div className='product-category-slider'>
                            <div className='show-slider'>
                                <SliderManager
                                    arrBookTL={this.state.arrBookTL}
                                    currentIndex={this.state.currentIndex}
                                />
                            </div>
                        </div>
                        <div className='show-more'>
                            <button className='btn-show-more'
                                onClick={() => this.handleShowMore(this.state.arrBookTL)}
                            >Xem thêm</button>
                        </div>
                    </div>
                    <div className='discount-category'>
                        <div className='discount-category-title'>Sản phẩm giảm giá</div>
                        <div className='product-category-slider'>
                            <div className='show-slider'>
                                <SliderManager
                                    arrBookTL={this.state.infoarrDiscount}
                                    currentIndex={this.state.currentIndex}
                                />
                            </div>
                        </div>
                        <div className='show-more'>
                            <button className='btn-show-more'
                                onClick={() => this.handleShowMore(this.state.infoarrDiscount)}

                            >Xem thêm</button>
                        </div>
                    </div>
                    <div className='selling-category'>
                        <div className='selling-category-title'>Sản phẩm bán chạy</div>
                        <div className='selling-category-info'>
                            <div className='selling-category-show'
                            // onClick={() => this.handleShowTL(item)}
                            >
                                <span>Theo tuần</span>
                            </div>
                            <div className='selling-category-show'
                            // onClick={() => this.handleShowTL(item)}
                            >
                                <span>Theo tháng</span>
                            </div>
                        </div>
                        <div className='product-category-slider'>
                            <div className='show-slider'>
                                <SliderManager
                                    arrBookTL={this.state.arrBookTL}
                                    currentIndex={this.state.currentIndex}
                                />
                            </div>
                        </div>
                        <div className='show-more'>
                            <button className='btn-show-more'>Xem thêm</button>
                        </div>
                    </div>
                    {/* <BeatLoader
                        color={'gray'}
                        loading={isShowLoding}
                        cssOverride={override}
                        size={15}
                        aria-label="Loading Spinner"
                        data-testid="BarLoader"
                    /> */}



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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeBody));
