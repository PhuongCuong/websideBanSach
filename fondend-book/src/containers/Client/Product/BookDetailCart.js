import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './BookDetailCart.scss';
import { couldStartTrivia } from 'typescript';
import _ from 'lodash';
import Countdown from 'react-countdown';

class BookDetailCart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrBook: {},
            soluong: 1
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.bookoj !== this.props.bookoj) {
            await this.handleaddarrTime()
        }
        if (prevState.arrBook !== this.state.arrBook) {
            this.setState({
                soluong: 1
            })
        }
        if (prevState.soluong !== this.state.soluong) {
            await this.props.loadDatafromsoluong(this.state.soluong)
        }
        else {
            await this.props.loadDatafromsoluong(this.state.soluong)
        }
    }

    async componentDidMount() {
        await this.handleaddarrTime()

    }

    handleaddarrTime = () => {
        let { bookoj } = this.props;
        let copyarrBook = { ...bookoj }
        let arr = {};

        if (!_.isEmpty(copyarrBook)) {
            let copymore = { ...copyarrBook };
            if (copymore && copymore.discountData) {
                let discountData = { ...copymore.discountData }
                let timeDiff = '';
                if (discountData.ngayBD <= new Date().getTime()) {
                    timeDiff = discountData.ngayKT - new Date().getTime();
                }

                var seconds = Math.floor(timeDiff / 1000) % 60;
                var minutes = Math.floor(timeDiff / 1000 / 60) % 60;
                var hours = Math.floor(timeDiff / 1000 / 60 / 60);
                let formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                discountData.timeDiff = formattedTime;
                copymore.discountData = discountData;
                copyarrBook = copymore;
            }
            if (!_.isEmpty(copyarrBook)) {
                this.setState({
                    arrBook: copyarrBook
                })
            }
        }
    }

    convertTimeToMilliseconds = (time) => {
        const [hours, minutes, seconds] = time.split(':').map(Number);
        const totalMilliseconds = hours * 3600000 + minutes * 60000 + seconds * 1000;
        return totalMilliseconds;
    };

    handleminus = async () => {
        let { soluong } = this.state;
        if (soluong <= 1) {
            this.setState({
                soluong: 1
            })
        }
        else {
            this.setState({
                soluong: --soluong
            })
        }

    }

    handleadds = async () => {
        let { soluong } = this.state;
        this.setState({
            soluong: ++soluong
        })

    }

    handleOnChangeInputs = async (event) => {
        this.setState({
            soluong: +event.target.value
        })

    }

    render() {
        let { bookoj } = this.props;
        let { arrBook, soluong } = this.state;
        let mount = '';
        let mountDiscount = '';
        if (arrBook.gia) {
            mount = parseFloat(arrBook.gia).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
            if (arrBook.discountData && arrBook.discountData.discount) {
                mountDiscount = parseFloat(arrBook.gia - (arrBook.discountData.discount * arrBook.gia)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

            }

        }
        return (
            <div className='book-cart-container'>
                <div className='book-cart-content'>
                    <div className='text-ten-sach'>{arrBook.tenSach ? arrBook.tenSach : ''}</div>
                    <div className='info-cungcap'>
                        <div className='cungcap-left'>
                            <div className='text-nha-cc'>Nhà cung cấp:
                                <span className='name-nha-cc'>
                                    {arrBook.nhacungcapData && arrBook.nhacungcapData.tenNCC ? arrBook.nhacungcapData.tenNCC : ''}
                                </span>
                            </div>
                            <div className='text-nha-xb'>Nhà xuất bản:
                                <span className='name-nha-xb'>
                                    {arrBook.nhaxuatbanData && arrBook.nhaxuatbanData.tenNXB ? arrBook.nhaxuatbanData.tenNXB : ''}
                                </span>
                            </div>
                        </div>
                        <div className='cungcap-right'>
                            <div className='text-tg'>Tác giả:
                                <span className='name-tg'>
                                    {arrBook.tacGia ? arrBook.tacGia : ''}
                                </span>
                            </div>
                            <div className='text-ht'>hình thức:<span className='hinh-thuc'>Bìa</span></div>
                        </div>
                    </div>
                    <div className='time-discount'>
                        <div className='discount-img'></div>
                        <div className='time-countdown'>
                            {arrBook.discountData && arrBook.discountData.timeDiff
                                && this.convertTimeToMilliseconds(arrBook.discountData.timeDiff) >= 0
                                ?
                                (<Countdown
                                    date={Date.now() + this.convertTimeToMilliseconds(arrBook.discountData.timeDiff)}
                                    renderer={({ days, hours, minutes, seconds }) => (
                                        <>
                                            <div className='time-day'>
                                                <span>
                                                    {days.toString().padStart(2, '0')}
                                                </span>
                                            </div>
                                            <span>:</span>
                                            <div className='time-hour'>
                                                <span>
                                                    {hours.toString().padStart(2, '0')}
                                                </span>
                                            </div>
                                            <span>:</span>
                                            <div className='time-minute'>
                                                <span>
                                                    {minutes.toString().padStart(2, '0')}
                                                </span>
                                            </div>
                                            <span>:</span>
                                            <div className='time-secoun'>
                                                <span>
                                                    {seconds.toString().padStart(2, '0')}
                                                </span>
                                            </div>
                                        </>
                                    )}
                                    onComplete={() =>
                                        <span>Hến hạn giảm giá</span>
                                    }
                                />)

                                :
                                <div className=''></div>
                            }


                        </div>
                    </div>

                    <div className='text-gia'>
                        {arrBook.discountData && arrBook.discountData.discount
                            && this.convertTimeToMilliseconds(arrBook.discountData.timeDiff) > 0
                            ?
                            <>
                                <span className='gia-discount'>
                                    {mountDiscount}
                                </span>
                                <span className='gia-bd'>{mount}</span>
                                <div className='range-discount'>
                                    <span>{`-${arrBook.discountData.discount * 100}%`}</span>
                                </div>
                            </>
                            :
                            <>
                                <span className='gia-discount'>{mount}</span>

                            </>
                        }


                    </div>
                    <div className='text-soluong'>Số lượng:

                        <div className='desgin-input-number'>
                            <div className='btn-minus'
                                onClick={() => this.handleminus()}
                            >
                                <i className="fas fa-minus"></i>
                            </div>
                            <input type='number'
                                onChange={(event) => this.handleOnChangeInputs(event)}
                                value={soluong}
                                className='input-soluong'
                                min={1}>
                            </input>
                            <div className='btn-adds'
                                onClick={() => this.handleadds()}
                            >
                                <i className="fas fa-plus"></i>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailCart);
