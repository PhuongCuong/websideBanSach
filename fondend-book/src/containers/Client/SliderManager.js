import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './SliderManager.scss'
import Slider from 'react-slick';
import * as actions from "../../store/actions"
import { withRouter } from 'react-router';


class SliderManager extends Component {

    constructor(props) {
        super(props)
        this.state = {
            slider: ''
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.arrBookTL !== this.props.arrBookTL) {
            this.slider.slickGoTo(0);
        }
    }

    componentDidMount() {
    }

    convertTimeToMilliseconds = (time) => {
        const [hours, minutes, seconds] = time.split(':').map(Number);
        const totalMilliseconds = hours * 3600000 + minutes * 60000 + seconds * 1000;
        return totalMilliseconds;
    };

    handleBookInfo = async (item) => {
        if (this.props.history) {
            this.props.history.push(`/book/${item.keyMap}`)
            await this.props.fetchallBookStart(item.keyMap);

        }
    }

    render() {
        let { arrBookTL, currentIndex } = this.props
        var settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 2,
            initialSlide: currentIndex
        };

        return (
            <div className='slider-container'>
                <div className='slider-content'>
                    <Slider {...settings} ref={(slider) => (this.slider = slider)}>
                        {arrBookTL && arrBookTL.length > 0
                            && arrBookTL.map((item, index) => {
                                return (
                                    <div className='book-slider-info'
                                        onClick={() => this.handleBookInfo(item)}
                                    >
                                        <div className='slider-img'
                                            style={{ backgroundImage: `url(${item.image})` }}
                                        ></div>
                                        <div className='silder-ten-sach'>{item.tenSach}</div>
                                        {item.discountData && item.discountData.discount && item.discountData.timeDiff &&
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
        fetchallBookStart: (maSach) => dispatch(actions.fetchallBookStart(maSach)),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SliderManager));
