import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './HomeBackgroup.scss'
import Slider from 'react-slick';
import { hanlegetAllBillmore } from '../../../services/BillService';


class HomeBackgroup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            sotfarr: 'banchay',
            arrproductmore: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    async componentDidMount() {
        let data = await hanlegetAllBillmore();
        if (data && data.errCode === 0) {
            this.setState({
                arrproductmore: data.data
            })
        }
    }

    handleSoftArr = async (id) => {
        let { arrproductmore } = this.state;
        this.setState({
            sotfarr: id
        })
        let arrBook = [...this.props.arrBook];
        if (id === 'banchay') {
            arrBook = this.props.originalArrBook.map((book) => {
                let item = arrproductmore.find((item) => book.keyMap === item.bookId);
                return item ? { ...book, soluong: item.soluong } : book;
            });
            arrBook.sort((a, b) => +b.soluong - +a.soluong)
        }
        else if (id === 'thapdencao') {
            arrBook.sort((a, b) => a.gia - b.gia)
        } else if (id === 'caodenthap') {
            arrBook.sort((a, b) => b.gia - a.gia)
        }
        await this.props.handleSort(arrBook)
    }


    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 2,
            slidesToScroll: 2,
        };
        let { sotfarr } = this.state;
        return (
            <div className='home-back-group-container'>
                <div className='home-back-group-content'>
                    <div className='home-back-group-title'>Nhà Sách Tiki</div>
                    <div className='home-back-group-slider'>
                        <Slider {...settings} autoplay='2000'>
                            <div className='div-1'>
                                <div className='div-child'>
                                    <div className='child-left'>
                                        <div className='img'></div>
                                    </div>
                                    <div className='child-right'>
                                        <div className='text-ncc'>Nhà sách NHÃ NAM</div>
                                        <div className='product-ncc'>
                                            <div className='img-1'></div>
                                            <div className='img-2'></div>
                                            <div className='img-3'></div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className='div-2'>
                                <div className='div-child'>
                                    <div className='child-left'>
                                        <div className='img'></div>
                                    </div>
                                    <div className='child-right'>
                                        <div className='text-ncc'>Nhà sách FAHASA</div>
                                        <div className='product-ncc'>
                                            <div className='img-1'></div>
                                            <div className='img-2'></div>
                                            <div className='img-3'></div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div className='div-3'>
                                <div className='div-child'>
                                    <div className='child-left'>
                                        <div className='img'></div>
                                    </div>
                                    <div className='child-right'>
                                        <div className='text-ncc'>ZENBOOKS</div>
                                        <div className='product-ncc'>
                                            <div className='img-1'></div>
                                            <div className='img-2'></div>
                                            <div className='img-3'></div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div className='div-4'>
                                <div className='div-child'>
                                    <div className='child-left'>
                                        <div className='img'></div>
                                    </div>
                                    <div className='child-right'>
                                        <div className='text-ncc'>BACHVIET BOOKS</div>
                                        <div className='product-ncc'>
                                            <div className='img-1'></div>
                                            <div className='img-2'></div>
                                            <div className='img-3'></div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div className='div-5'>
                                <div className='div-child'>
                                    <div className='child-left'>
                                        <div className='img'></div>
                                    </div>
                                    <div className='child-right'>
                                        <div className='text-ncc'>FUTUREBOOK</div>
                                        <div className='product-ncc'>
                                            <div className='img-1'></div>
                                            <div className='img-2'></div>
                                            <div className='img-3'></div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div className='div-6'>
                                <div className='div-child'>
                                    <div className='child-left'>
                                        <div className='img'></div>
                                    </div>
                                    <div className='child-right'>
                                        <div className='text-ncc'>DELI</div>
                                        <div className='product-ncc'>
                                            <div className='img-1'></div>
                                            <div className='img-2'></div>
                                            <div className='img-3'></div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div className='div-7'>
                                <div className='div-child'>
                                    <div className='child-left'>
                                        <div className='img'></div>
                                    </div>
                                    <div className='child-right'>
                                        <div className='text-ncc'>FIRST NEW</div>
                                        <div className='product-ncc'>
                                            <div className='img-1'></div>
                                            <div className='img-2'></div>
                                            <div className='img-3'></div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div className='div-8'>
                                <div className='div-child'>
                                    <div className='child-left'>
                                        <div className='img'></div>
                                    </div>
                                    <div className='child-right'>
                                        <div className='text-ncc'>THIÊN LONG</div>
                                        <div className='product-ncc'>
                                            <div className='img-1'></div>
                                            <div className='img-2'></div>
                                            <div className='img-3'></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                    <div className='home-back-group-category'>
                        <div className={sotfarr === 'banchay' ? 'ban-chay active' : 'ban-chay'}
                            onClick={() => this.handleSoftArr('banchay')}
                        >
                            <span>Bán Chạy</span>
                        </div>
                        <div className={sotfarr === 'caodenthap' ? 'gia-cao-den-thap active' : 'gia-cao-den-thap'}
                            onClick={() => this.handleSoftArr('caodenthap')}

                        >
                            <span>Giá Cao Đến Thấp</span>
                        </div>
                        <div className={sotfarr === 'thapdencao' ? 'gia-thap-den-cao active' : 'gia-thap-den-cao'}
                            onClick={() => this.handleSoftArr('thapdencao')}
                        >
                            <span>Giá Thấp Đến Cao</span>
                        </div>

                    </div>
                </div>
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeBackgroup);
