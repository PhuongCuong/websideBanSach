import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './HomeBackgroup.scss'
import Slider from 'react-slick';


class HomeBackgroup extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    componentDidMount() {
    }


    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 2,
            slidesToScroll: 2,
        };
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
                        <div className='ban-chay'>
                            <span>Bán Chạy</span>
                        </div>
                        <div className='gia-cao-den-thap'>
                            <span>Giá Cao Đến Thấp</span>
                        </div>
                        <div className='gia-thap-den-cao'>
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
